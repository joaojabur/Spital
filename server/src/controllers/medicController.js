const knex = require("../database");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        const results = await knex("medics");

        res.status(201).json(results);
      } else {
        const [result] = await knex("user").where({ id });

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

  async create(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      area,
      graduation,
      master_degree,
      doctorate_degree,
      cpf,
      rg,
      birth_date,
      schedule,
    } = req.body;

    const hashPassword = bcrypt.hash(password, 10);
    console.log(hashPassword);

    try {
      const isTheEmailAlreadyRegisteredInMedics = await knex("user").where({
        email,
      });

      const isTheCPFOrRGAlreadyRegistered = await knex("medics").where({
        cpf,
        rg,
      });

      if (isTheEmailAlreadyRegisteredInMedics.length > 0) {
        res.status(400).send({ error: "E-mail já registrado" });
      } else if (isTheCPFOrRGAlreadyRegistered.length > 0) {
        res.status(400).send({ error: "CPF e RG já registrados" });
      } else {
        const userID = await knex("user").returning("id").insert({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashPassword,
        });

        const medicID = await knex("medics")
          .returning("userID")
          .insert({
            userID: parseInt(userID),
            phoneNumber: String(phoneNumber),
            area,
            graduation,
            master_degree,
            doctorate_degree,
            cpf,
            rg,
            birth_date,
          });

        const medicSchedule = schedule.map((scheduleItem) => {
          return {
            medic_id: parseInt(medicID),
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
