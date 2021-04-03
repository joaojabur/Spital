const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { email, password } = req.body;

      const results = await knex("clients")
        .where({
          email: email,
          password: password,
        })
        .select("*");

      if (results) {
        res.send(results);
      } else {
        res.send({ errMessage: "Senha ou e-mail incorreto(s)" });
      }
    } catch (error) {
      next(error);
    }
  },
};
