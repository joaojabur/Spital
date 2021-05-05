const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { medic_id, client_id } = req.query;

      const query = knex("reviews");

      if (medic_id) {
        query
          .where({
            medicID: medic_id,
            clientID: client_id,
          })
          .join("medics", "medics.id", "=", "reviews.medicID")
          .select(
            "reviews.*",
            "medics.userID",
            "medics.userID",
            "clients.userID"
          );
      }

      const results = await query;

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { stars, description } = req.body;
      const { medic_id, client_id } = req.query;
      await knex("reviews").insert({
        stars,
        description,
        medic_id,
        client_id,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { stars, description } = req.body;

      await knex("reviews")
        .update({
          stars,
          description,
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
      await knex("reviews").where({ id }).del();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
