const knex = require("../database");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID } = req.query;

      const results = await knex
        .where({ medicID })
        .join("medic_schedule", "schedules.id", "=", "medic_schedule.scheduleID")
        .select("schedules.*", "medic_schedule.*");

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { schedule } = req.body;

      const medicSchedule = schedule.map((scheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await knex("medic_schedule").insert(medicSchedule);

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { week_day, from, to } = req.body;
    const { id } = req.params;
    try {
      await knex("medic_schedule")
        .update({
          week_day,
          from,
          to,
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

      await knex("medic_schedule").where({ id }).del();

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
