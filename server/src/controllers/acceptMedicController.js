const knex = require("../database");

module.exports = {
  async create(req, res, next) {
    try {
      const { medicID } = req.params;

      await knex("medics").where({ id: medicID }).update({ accepted: true });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
