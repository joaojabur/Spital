const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { medicID } = req.query;

      const results = await knex("schedules")
        .where({ medicID })
        .join("appointments", "appointments.scheduleID", "=", "schedules.id")
        .join("clients", "clients.id", "=", "appointments.clientID")
        .join("users", "users.id", "=", "clients.userID")
        .select(
          "clients.id",
          "clients.phoneNumber",
          "users.first_name",
          "users.last_name"
        );

      res.status(201).send(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
    } catch (error) {}
  },

  async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },
};
