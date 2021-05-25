const knex = require("../database");
const stripe = require("stripe")(
  "sk_test_51Iv07nLzHamxFkPlwZOGPKqEBl1HDE0LwfKHD2xM72UVxkSvXDMjuiXcBRaE7KZTpP2GuYc3zZpO3YQFEYHbJqWd00V5GLDFwo"
);

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID, date } = req.query;
      console.log(date);

      const query = knex("schedules");

      if (medicID !== undefined || date !== undefined) {
        query
          .where({ medicID: medicID, date: date })
          .join("appointments", "schedules.id", "=", "appointments.scheduleID")
          .select(["appointments.*", "schedules.medicID"]);
      } else {
        query
          .join("appointments", "schedules.id", "=", "appointments.scheduleID")
          .select(["appointments.*", "schedules.medicID"]);
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

      const account = await stripe.accounts.create({
        type: "standard",
      });

      const accountLinks = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "http://localhost:3000/",
        return_url: "http://localhost:3000",
        type: "account_onboarding",
      });

      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: 100,
        currency: "brl",
        application_fee_amount: 123,
        transfer_data: {
          destination: account.id,
        },
      });

      console.log(paymentIntent);

      res.status(201).send();
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
      await knex("appointments").where({ id }).del();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
