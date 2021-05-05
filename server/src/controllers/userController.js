const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        const results = await knex("users");

        return res.status(200).json(results);
      } else {
        const [result] = await knex("users").where({ id });

        return res.status(200).json({
          email: result.email,
          firstName: result.first_name,
          lastName: result.last_name,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
