const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { medic_id } = req.query;
      const query = knex("appointments");

      if (medic_id) {
        query
          .where("medic_id", medic_id)
          .join("medics", "medics.id", "=", "appointments.medic_id")
          .select("appointments.*", "medics.first_name", "medics.last_name");
      }

      const results = await query;

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { week_day, from, to } = req.body;
      const { medic_id } = req.query;
      await knex("appointments").insert({
        medic_id,
        week_day,
        from,
        to,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { week_day, from, to } = req.body;
      await knex("appointments")
        .update({
          week_day,
          from,
          to,
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
