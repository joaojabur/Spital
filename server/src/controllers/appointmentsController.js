const knex = require("../database");
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
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "BRL",
        description: "consulta Spital",
        payment_method: id,
        confirm: true,
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

      await knex("appointments").where({ payment_intent: id }).del();

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
