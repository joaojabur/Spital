const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const results = await knex("medics");

      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    const {
      first_name,
      last_name,
      email,
      password,
      phoneNumber,
      created_at,
      area,
      graduation,
      master_degree,
      doctorate_degree,
      cpf,
      rg,
      birth_date,
      card_name,
      card_number,
      card_expiration_date,
      card_verification_number,
    } = req.body;

    try {
      await knex("medics").insert({
        first_name,
        last_name,
        email,
        password,
        phoneNumber,
        created_at,
        area,
        graduation,
        master_degree,
        doctorate_degree,
        cpf,
        rg,
        birth_date,
        card_name,
        card_number,
        card_expiration_date,
        card_verification_number,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const {
      first_name,
      last_name,
      email,
      password,
      phoneNumber,
      created_at,
      area,
      graduation,
      master_degree,
      doctorate_degree,
      cpf,
      rg,
      birth_date,
      card_name,
      card_number,
      card_expiration_date,
      card_verification_number,
      week_day,
      from,
      to,
    } = req.body;

    const { id } = req.params;

    try {
      await knex("medics")
        .update({
          first_name,
          last_name,
          email,
          password,
          phoneNumber,
          created_at,
          area,
          graduation,
          master_degree,
          doctorate_degree,
          cpf,
          rg,
          birth_date,
          card_name,
          card_number,
          card_expiration_date,
          card_verification_number,
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
    const { id } = req.params;

    try {
      await knex("medics").where({ id }).del();

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
