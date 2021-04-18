const knex = require("../database");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");
const bcrypt = require("bcrypt");

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
      schedule,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const isTheEmailAlreadyRegisteredInMedics = await knex("medics").where({
        email,
      });
      const isTheEmailAlreadyRegisteredInClients = await knex("clients").where({
        email,
      });

      const isTheCPFOrRGAlreadyRegistered = await knex("medics").where({
        cpf,
        rg,
      });

      if (
        isTheEmailAlreadyRegisteredInMedics.length > 0 ||
        isTheEmailAlreadyRegisteredInClients.length > 0
      ) {
        res.status(400).send({ error: "E-mail já registrado" });
      } else if (isTheCPFOrRGAlreadyRegistered.length > 0) {
        res.status(400).send({ error: "CPF e RG já registrados" });
      } else {
        const insertedMedicsId = await knex("medics").returning("id").insert({
          first_name,
          last_name,
          email,
          password: hashPassword,
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

        const medic_id = Number(insertedMedicsId[0]);
        const numberMedic_id = new Number(medic_id);

        const medicSchedule = schedule.map((scheduleItem) => {
          return {
            medic_id: numberMedic_id,
            week_day: scheduleItem.week_day,
            from: convertHourToMinutes(scheduleItem.from),
            to: convertHourToMinutes(scheduleItem.to),
          };
        });

        await knex("medic_schedule").insert(medicSchedule);

        res.status(201).send();
      }
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
