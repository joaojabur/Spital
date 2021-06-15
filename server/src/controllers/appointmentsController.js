const knex = require("../database");
const paymentConfirmation = require("../services/email/paymentConfirmation");
const refundConfirmation = require("../services/email/refundConfirmation");
const moip = require("moip-sdk-node").default({
  accessToken: "7bd5812b36bd4cc89f69311f8badc7e9_v2",
  production: false,
});

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID, date, scheduleID } = req.query;

      let query = knex("schedules");

      if (scheduleID) {
        query = await knex("appointments")
          .where({ scheduleID })
          .join("schedules", "schedules.id", "=", "appointments.scheduleID")
          .join("medics", "medics.id", "=", "schedules.medicID")
          .join("users", "users.id", "=", "medics.userID")
          .select([
            "appointments.*",
            "schedules.medicID",
            "medics.*",
            "users.*",
          ]);
      }
      if (!scheduleID) {
        if (medicID !== undefined && date !== undefined) {
          query
            .where({ medicID: medicID, date: date })
            .join(
              "appointments",
              "schedules.id",
              "=",
              "appointments.scheduleID"
            )
            .join("medics", "medics.id", "=", "schedules.medicID")
            .select(["appointments.*", "schedules.medicID", "medics.*"]);
        } else if (medicID !== undefined) {
          query
            .where({ medicID: medicID })
            .join(
              "appointments",
              "schedules.id",
              "=",
              "appointments.scheduleID"
            )
            .join("medics", "medics.id", "=", "schedules.medicID")
            .join("clients", "clients.id", "=", "appointments.clientID")
            .join("users", "users.id", "=", "clients.userID")
            .select([
              "appointments.id",
              "appointments.type",
              "appointments.date",
              "appointments.time",
              "appointments.price",
              "appointments.confirmed",
              "users.first_name",
              "users.last_name",
            ])
            .orderByRaw("id DESC");
        } else {
          query
            .join(
              "appointments",
              "schedules.id",
              "=",
              "appointments.scheduleID"
            )
            .join("medics", "medics.id", "=", "schedules.medicID")
            .join("clients", "clients.id", "=", "appointments.clientID")

            .select(["appointments.*", "schedules.medicID", "clients.*"]);
        }
      }

      const results = await query;

      res.status(201).send(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { clientID } = req.query;
      const { appointmentData } = req.body;

      const [customerMoipID] = await knex("clients")
        .where({ id: clientID })
        .select("accountID");

      moip.order
        .create({
          ownId: clientID,
          amount: {
            currency: "BRL",
            subtotals: {
              shipping: 0,
            },
          },
          items: [
            {
              product: appointmentData.type,
              quantity: 1,
              detail: `Consulta médica ${appointmentData.date} - ${appointmentData.time}`,
              price: Number(appointmentData.price) * 100,
            },
          ],

          customer: {
            id: customerMoipID.accountID,
          },
        })
        .then((response) => {
          console.log(response.body.id);

          res.status(201).json({
            message: "Pedido enviado com sucesso! 🎉",
            success: true,
            orderID: response.body.id,
          });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "Falha ao realizar o pagamento 😪",
        success: false,
      });
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { date, time } = req.body;
      await knex("appointments")
        .update({
          date,
          time,
        })
        .where({ id });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await stripe.refunds.create({
        payment_intent: id,
      });

      const [appointment] = await knex("appointments")
        .where({ payment_intent: id })
        .join("schedules", "schedules.id", "=", "appointments.scheduleID")
        .select("appointments.*", "schedules.medicID");

      const [medic] = await knex("medics")
        .where("medics.id", "=", appointment.medicID)
        .join("users", "users.id", "=", "medics.userID")
        .select("users.*", "medics.*");
      const [client] = await knex("clients")
        .where("clients.id", "=", appointment.clientID)
        .join("users", "users.id", "=", "clients.userID")
        .select("users.*", "clients.*");

      await knex("appointments").where({ payment_intent: id }).del();

      refundConfirmation({
        name: `${client.first_name} ${client.last_name}`,
        email: client.email,
        medic,
        appointment,
      });

      res.status(201).json({
        message: "Reembolso realizado com sucesso!",
        success: true,
      });
    } catch (error) {
      res.send(401).json({
        message: "Erro ao realizar o reembolso",
        success: false,
      });
    }
  },

  async list(req, res, next) {
    const { clientID } = req.params;

    const query = knex("appointments");

    if (clientID) {
      query
        .where({ clientID })
        .join("schedules", "schedules.id", "=", "appointments.scheduleID")
        .join("medics", "medics.id", "=", "schedules.medicID")
        .join("users", "users.id", "=", "medics.userID")
        .select(["appointments.*", "schedules.medicID", "medics.*", "users.*"])
        .orderBy([{ column: "appointments.created_at", order: "desc" }]);
    }

    const results = await query;
    res.status(200).send(results);

    try {
    } catch (error) {
      next(error);
    }
  },

  async pay(req, res, next) {
    try {
      const { orderID } = req.params;
      const { medicID, clientID } = req.query;
      const { date, type, hash } = req.body;

      moip.payment
        .create(orderID, {
          installmentCount: 1,
          fundingInstrument: {
            method: "CREDIT_CARD",
            creditCard: {
              hash: hash,
            },
          },
        })
        .then(async (response) => {
          console.log(response.body);
          const scheduleID = await knex("schedules").returning("id").insert({
            medicID,
          });

          await knex("appointments").insert({
            clientID: parseInt(clientID),
            scheduleID: parseInt(scheduleID),
            date,
            time: appointmentData.time,
            price: parseInt(appointmentData.price),
            paymentID: response.data.id,
            type,
          });

          const [medic] = await knex("medics")
            .where("medics.id", "=", medicID)
            .join("users", "users.id", "=", "medics.userID")
            .select("users.*", "medics.*");
          const [client] = await knex("clients")
            .where("clients.id", "=", clientID)
            .join("users", "users.id", "=", "clients.userID")
            .select("users.*", "clients.*");

          if (medic && client) {
            await paymentConfirmation({
              name: `${client.first_name} ${client.last_name}`,
              email: client.email,
              medic: medic,
              appointment: appointmentData,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      res.send(201).json({ success: true, message: "Pagamento concluído!" });
    } catch (error) {
      next(error);
    }
  },
};
