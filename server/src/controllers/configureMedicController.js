const knex = require("../database");
const stripe = require("stripe")(
  "sk_test_51Iv07nLzHamxFkPlwZOGPKqEBl1HDE0LwfKHD2xM72UVxkSvXDMjuiXcBRaE7KZTpP2GuYc3zZpO3YQFEYHbJqWd00V5GLDFwo"
);

module.exports = {
  async index(req, res, next) {
    const { email } = req.body;

    try {
      const account = await stripe.accounts.create({
        type: "standard",
        country: "BR",
        email: "jabur0205@gmail.com",
      });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "http://localhost:3000",
        return_url: "http://localhost:3000",
        type: "account_onboarding",
      });

      await knex("medics").update({ accountID: account.id });

      res.status(201).send(accountLink.url);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { medicID, userID } = req.query;
      const { appointments, address, number, lat, lon } = req.body;
      for (let appointment of appointments) {
        await knex("consult_type").insert({
          type: appointment.name,
          price: appointment.price,
          medicID: medicID.toString(),
        });
      }

      await knex("addresses").insert({
        address,
        number,
        lat,
        lon,
        userID: userID.toString(),
      });

      await knex("medics").update({ configured: true }).where({ id: medicID });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
