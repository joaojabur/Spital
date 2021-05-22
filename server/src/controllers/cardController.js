const knex = require("../database");
const pagarme = require("pagarme");

module.exports = {
  async index(req, res, next) {
    try {
      const { userID } = req.query;

      const results = await knex("cards").where({ userID });

      for (let i in results) {
        let cardID = results[i].cardID;

        const card = await pagarme.client
          .connect({ api_key: "ak_live_1LTY4ZT4KedK1k68VQRzmVM3znX40e" })
          .then((client) => client.cards.find({ id: cardID }))
          .then((card) => {
            return card;
          });

        results[i] = {
          ...results[i],
          card,
        };
      }

      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    const { userID } = req.query;
    const { card_number, card_expiration_date, card_holder_name, card_cvv } =
      req.body;

    try {
      pagarme.client
        .connect({ api_key: "ak_live_1LTY4ZT4KedK1k68VQRzmVM3znX40e" })
        .then((client) =>
          client.cards.create({
            card_number: card_number,
            card_holder_name: card_holder_name,
            card_expiration_date: card_expiration_date,
            card_cvv: card_cvv,
          })
        )
        .then((card) => knex("cards").insert({ cardID: card.id, userID }));

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      console.log(id);

      await knex("cards").where({ id }).delete();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
