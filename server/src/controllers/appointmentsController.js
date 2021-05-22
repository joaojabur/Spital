const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID, date } = req.query;
      console.log(date);

      const query = knex("schedules");

      if (medicID !== undefined || date !== undefined) {
        query
          .where({ medicID: medicID, date: date })
          .join("appointments", "schedules.id", "=", "appointments.scheduleID")
          .select(["appointments.*", "schedules.medicID"]);
      } else {
        query
          .join("appointments", "schedules.id", "=", "appointments.scheduleID")
          .select(["appointments.*", "schedules.medicID"]);
      }

      const results = await query;

      res.status(201).send(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { date, time } = req.body;
      const { medicID } = req.query;
      const { clientID } = req.query;

      const scheduleID = await knex("schedules").returning("id").insert({
        medicID,
      });

      await knex("appointments").insert({
        scheduleID: parseInt(scheduleID),
        date,
        time,
        clientID: parseInt(clientID),
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { date, time } = req.body;
      await knex("appointments")
        .update({
          date,
          time,
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
