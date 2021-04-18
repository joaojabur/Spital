const knex = require("../database");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/authConfig.json");
const bcrypt = require("bcrypt");
const validateTokens = require("../configs/jwt");

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

      const hashPassword = await bcrypt.hash(password, 10);

      const isTheEmailAlreadyRegisteredInClients = await knex("clients").where({
        email,
      });
      const isTheEmailAlreadyRegisteredInMedics = await knex("medics").where({
        email,
      });

      if (
        isTheEmailAlreadyRegisteredInMedics.length > 0 ||
        isTheEmailAlreadyRegisteredInClients.length > 0
      ) {
        res.status(400).send({ error: "E-mail já registrado" });
      } else {
        await knex("clients").insert({
          first_name,
          last_name,
          email,
          password: hashPassword,
          phoneNumber,
        });

        return res.status(201).send();
      }
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

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await knex("clients")
        .where({ email })
        .select("password", "id", "first_name", "last_name", "phoneNumber");

      if (user.length === 0) {
        return res.status(401).send({ error: "Usuário não encontrado" });
      }

      if (await bcrypt.compare(password, user[0].password)) {
        const token = jwt.sign({ id: user[0].id }, authConfig.secret, {
          expiresIn: 604800,
        });

        res.cookie("access-token", token, {
          maxAge: 60 * 60 * 24 * 7 * 1000,
        }),
          {
            httpOnly: true,
          };

        res.status(201).send({ user, token });
      } else {
        return res.status(401).send({ error: "Senha ou e-mail inválido(s)" });
      }
    } catch (error) {
      next(error);
    }
  },
};
