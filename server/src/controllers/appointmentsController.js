const knex = require("../database");
const paymentConfirmation = require("../services/email/paymentConfirmation");
const refundConfirmation = require("../services/email/refundConfirmation");
const stripe = require("stripe")(
  "sk_test_51Iv07nLzHamxFkPlwZOGPKqEBl1HDE0LwfKHD2xM72UVxkSvXDMjuiXcBRaE7KZTpP2GuYc3zZpO3YQFEYHbJqWd00V5GLDFwo"
);

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
        if (medicID !== undefined || date !== undefined) {
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
        } else {
          query
            .join(
              "appointments",
              "schedules.id",
              "=",
              "appointments.scheduleID"
            )
            .join("medics", "medics.id", "=", "schedules.medicID")
            .select(["appointments.*", "schedules.medicID"]);
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
      const { medicID, clientID } = req.query;
      const { amount, id, appointmentData, date } = req.body;

      const [{ accountID }] = await knex("medics")
        .where({ id: medicID })
        .select("medics.accountID");

      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "BRL",
        description: "consulta Spital",
        payment_method: id,
        confirm: true,
        transfer_data: {
          destination: accountID,
        },
      });

      const scheduleID = await knex("schedules").returning("id").insert({
        medicID,
      });

      await knex("appointments").insert({
        clientID: parseInt(clientID),
        scheduleID: parseInt(scheduleID),
        date,
        time: appointmentData.time,
        price: parseInt(appointmentData.price),
        card_id: id,
        payment_intent: payment.id,
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

      res.status(201).json({
        message: "Payment succesfull 😀",
        success: true,
      });
    } catch (error) {
      res.status(401).json({
        message: "Payment failed 😥",
        success: false,
      });
      console.log(error);
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

      console.log(appointment, client, medic);

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
};
