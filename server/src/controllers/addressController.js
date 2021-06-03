const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id } = req.query;

      const query = knex("addresses");

      if (user_id) {
        query
          .where("userID", user_id)
          .join("users", "users.id", "=", "addresses.userID")
          .select("addresses.*", "users.id");
      }

      const results = await query;

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { address, number, lat, lon } = req.body;
      const { user_id } = req.query;

      await knex("addresses").insert({
        address,
        number,
        lat,
        lon,
        userID: user_id,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { address, number, lat, long } = req.body;

      await knex("addresses")
        .update({
          address,
          number,
          lat,
          long,
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
      await knex("addresses").where({ id }).del();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
