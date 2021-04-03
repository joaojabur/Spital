const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const results = await knex("clients");

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { first_name, last_name, email, password, phoneNumber } = req.body;

      await knex("clients").insert({
        first_name,
        last_name,
        email,
        password,
        phoneNumber,
      });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { first_name, last_name, email, password, phoneNumber } = req.body;
    const { id } = req.params;
    try {
      await knex("clients")
        .update({
          first_name,
          last_name,
          email,
          password,
          phoneNumber,
        })
        .where({ id });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("clients").where({ id }).del();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
