const knex = require("../database");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");

module.exports = {
  async index(req, res, next) {
    try {
      const { medic_id } = req.query;
      const query = knex("medic_schedule");

      if (medic_id) {
        query
          .where("medic_id", medic_id)
          .join("medics", "medics.id", "=", "medic_schedule.medic_id")
          .select("medic_schedule.*", "medics.first_name", "medics.last_name");
      }

      const results = await query;

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
