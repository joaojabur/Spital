const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID } = req.query;

      const results = await knex
        .select("*")
        .from("schedules")
        .where({ medicID })
        .join("appointments", { "schedules.id": "appointments.scheduleID" });

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { date } = req.body;
      const { medicID } = req.query;
      const { clientID } = req.query;

      const scheduleID = await knex("schedules").returning("id").insert({
        medicID,
      });

      await knex("appointments").insert({
        scheduleID,
        date,
        clientID,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { date } = req.body;
      await knex("appointments")
        .update({
          date,
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
