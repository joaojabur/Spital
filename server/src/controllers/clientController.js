const knex = require("../database");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/authConfig.json");
const bcrypt = require("bcrypt");
const validateTokens = require("../configs/jwt");

module.exports = {
  async index(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        const results = await knex("clients");

        return res.status(200).json(results);
      } else {
        const results = await knex("clients").where({ id });

        return res.status(200).json(results);
      }
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const isTheEmailAlreadyRegistered= await knex("user").where({
        email,
      });

      if (isTheEmailAlreadyRegistered.length) {
        res.status(400).send({ error: "E-mail já registrado" });
      } else {
        const userID = await knex("user").returning('id').insert({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashPassword,
        });
        
        await knex('clients').insert({
          phoneNumber: String(phoneNumber),
          userID: parseInt(userID)
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

      const [ user ] = await knex("user")
        .where({ email })
        .select("password", "id", "first_name", "last_name");

      if (user === undefined) {
        return res.status(401).send({ error: "Usuário não encontrado" });
      }

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 604800,
        });

        res.cookie(
          "access-token",
          token,
          {
            maxAge: 60 * 60 * 24 * 7 * 1000,
          },
          {
            httpOnly: true,
          }
        );
        
        console.log(user);
        
        res.status(201).send({ user, token });
      } else {
        return res.status(401).send({ error: "Senha ou e-mail inválido(s)" });
      }
    } catch (error) {
      next(error);
    }
  },

  async auth(req, res, next) {
    const { post } = res.locals;
    res
      .status(200)
      .send({ auth: true, success: "Logado com sucesso!", user_id: post });
  },
};
