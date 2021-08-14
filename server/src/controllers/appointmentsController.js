const knex = require("../database");
const paymentConfirmation = require("../services/email/paymentConfirmation");
const paymentConfirmationMedic = require("../services/email/paymentConfirmationMedic");
const convertHoursToMinutes = require("../utils/convertHoursToMinutes");
const refundConfirmation = require("../services/email/refundConfirmation");
const refundConfirmationMedic = require("../services/email/refundConfirmationMedic");
var ID = require("nodejs-unique-numeric-id-generator");
require("dotenv").config({ path: "./src/.env" });
const moip = require("moip-sdk-node").default({
  accessToken: process.env.MOIP_ACCESS_TOKEN,
  production: false,
});
const pagarme = require("pagarme");

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID, date, scheduleID } = req.query;

      let query = knex("schedules");

      if (scheduleID) {
        query = knex("appointments")
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
            .join("users", "users.id", "=", "medics.userID")
            .select([
              "appointments.*",
              "schedules.medicID",
              "medics.*",
              "users.first_name as medicFirstName",
            ]);
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
      const { clientID, medicID } = req.query;
      const { card, appointmentData, cpf, date } = req.body;

      const formatted_cpf = cpf.replace(/[-. ]/g, "");

      var random_id = ID.generate(new Date().toJSON());

      let [medic] = await knex("medics")
        .where("medics.id", "=", medicID)
        .join("users", "users.id", "=", "medics.userID")
        .select("recipientID", "email", "userID", "first_name", "last_name");

      let [client_info] = await knex("clients")
        .where("clients.id", "=", clientID)
        .join("users", "users.id", "=", "clients.userID")
        .select("users.*", "clients.*");

      let [location] = await knex("addresses").where("userID", medic.userID);

      const formatted_phone_number = client_info.phoneNumber.replace(
        /[-() ]/g,
        ""
      );

      let transaction = await pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) =>
          client.transactions.create({
            amount: Number(appointmentData.price) * 100,
            card_hash: card,
            billing: {
              name: "João Accoroni Jabur",
              address: {
                country: "br",
                state: "sp",
                city: "Ribeirão Preto",
                neighborhood: "Villa do Golfe",
                street: "Rua Capitão Waldemar de Figueiredo",
                street_number: "650",
                zipcode: "14027600",
              },
            },
            customer: {
              external_id: `#${random_id}`,
              name: `${client_info.first_name} ${client_info.last_name}`,
              type: "individual",
              country: "br",
              email: client_info.email,
              documents: [
                {
                  type: "cpf",
                  number: formatted_cpf,
                },
              ],
              phone_numbers: [`+55${formatted_phone_number}`],
              birthday: client_info.birth_date,
            },
            items: [
              {
                id: random_id,
                title: appointmentData.type,
                unit_price: Number(appointmentData.price) * 100,
                quantity: 1,
                tangible: true,
              },
            ],
            split_rules: [
              {
                recipient_id: medic.recipientID,
                percentage: 80,
                liable: true,
                charge_processing_fee: true,
              },
              {
                recipient_id: "re_ckosx2xku003b0h9tdfv3bk1x",
                percentage: 20,
                liable: true,
                charge_processing_fee: true,
              },
            ],
          })
        );

      if (transaction.card.valid) {
        const scheduleID = await knex("schedules").returning("id").insert({
          medicID,
        });

        await knex("appointments").insert({
          clientID: parseInt(clientID),
          scheduleID: parseInt(scheduleID),
          date,
          time: appointmentData.time,
          price: parseInt(appointmentData.price),
          type: appointmentData.type,
          transactionID: transaction.id,
        });

        await paymentConfirmation({
          name: `${medic.first_name} ${medic.last_name}`,
          email: client_info.email,
          medic: medic,
          appointment: appointmentData,
          time: appointmentData.time,
          location: location,
        });

        await paymentConfirmationMedic({
          email: medic.email,
          appointment: appointmentData,
          time: appointmentData.time,
        });
      } else {
        new Error("Erro ao realizar o pagamento 😥");
      }

      res.status(201).json({
        message: "Consulta marcada com sucesso! 🎉",
        success: true,
      });
    } catch (error) {
      next(error);
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

      const [appointment] = await knex("appointments")
        .where({ transactionID: id })
        .join("schedules", "schedules.id", "=", "appointments.scheduleID")
        .select("appointments.*", "schedules.medicID");

      pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) =>
          client.transactions.refund({
            id: id,
          })
        );

      const [medic] = await knex("medics")
        .where("medics.id", "=", appointment.medicID)
        .join("users", "users.id", "=", "medics.userID")
        .select("users.*", "medics.*");
      const [client] = await knex("clients")
        .where("clients.id", "=", appointment.clientID)
        .join("users", "users.id", "=", "clients.userID")
        .select("users.*", "clients.*");

      await knex("appointments").where({ transactionID: id }).del();

      let [location] = await knex("addresses").where("userID", medic.userID);

      refundConfirmation({
        name: `${medic.first_name} ${medic.last_name}`,
        email: client.email,
        medic,
        appointment,
        location: location,
      });

      refundConfirmationMedic({
        email: medic.email,
        appointment: appointment,
        time: appointment.time,
      });

      res.status(201).json({
        message: "Reembolso realizado com sucesso!",
        success: true,
      });
    } catch (error) {
      next(error);
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
        .join("addresses", "addresses.userID", "=", "users.id")
        .select([
          "appointments.*",
          "schedules.medicID",
          "medics.*",
          "users.*",
          "addresses.*",
        ])
        .orderBy([{ column: "appointments.created_at", order: "desc" }]);
    }

    const results = await query;
    res
      .status(200)
      .send(results.map((result) => ({ ...result, password: undefined })));

    try {
    } catch (error) {
      next(error);
    }
  },
};
