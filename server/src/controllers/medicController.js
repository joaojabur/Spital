const knex = require("../database");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res, next) {
    try {
      let { userID, offset } = req.query;

      if (!offset) {
        offset = 1;
      }

      if (!userID) {
        let results = await knex("medics")
          .limit(30)
          .offset(offset * 30);

        for (let i in results) {
          let medicID = results[i].userID;
          let [result] = await knex("users")
            .where({ id: medicID })
            .select("first_name", "last_name", "email");

          results[i] = {
            ...results[i],
            firstName: result.first_name,
            lastName: result.last_name,
            email: result.email,
          };
        }

        res.status(201).json(results);
      } else {
        const [result] = await knex("medics").where({ userID });

        return res.status(200).json(result);
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
      crm,
      cpf,
      rg,
      birthDate,
      schedule,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const isTheEmailAlreadyRegistered = await knex("users").where({
        email,
      });

      const isTheCPFOrRGAlreadyRegistered = await knex("medics").where({
        cpf,
        rg,
      });

      if (isTheEmailAlreadyRegistered.length > 0) {
        res.status(400).send({ error: "E-mail já registrado" });
      } else if (isTheCPFOrRGAlreadyRegistered.length > 0) {
        res.status(400).send({ error: "CPF e RG já registrados" });
      } else {
        const userID = await knex("users").returning("id").insert({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashPassword,
          xp: 0,
        });

        const medicID = await knex("medics")
          .returning("id")
          .insert({
            userID: parseInt(userID),
            phoneNumber: String(phoneNumber),
            area,
            graduation,
            master_degree,
            doctorate_degree,
            crm,
            cpf,
            rg,
            birth_date: birthDate,
          });

        const scheduleID = await knex("schedules")
          .returning("id")
          .insert({ medicID: parseInt(medicID) });

        for (let sche of schedule) {
          await knex("medic_schedule").insert({
            scheduleID: parseInt(scheduleID),
            week_day: sche.week_day,
            from: convertHourToMinutes(sche.from),
            to: convertHourToMinutes(sche.to),
          });
        }

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
      crm,
      cpf,
      rg,
      birth_date,
    } = req.body;

    const { userID } = req.params;

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
          crm,
          rg,
          birth_date,
        })
        .where({ userID });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    const { userID } = req.params;

    try {
      await knex("medics").where({ userID }).del();

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    const { area } = req.params;
    let { offset } = req.query;

    if (offset === undefined) {
      offset = 0;
    }

    try {
      let results = await knex("medics")
        .where({ area })
        .limit(30)
        .offset(offset * 30);

      for (let i in results) {
        let medicID = results[i].userID;
        let [result] = await knex("users")
          .where({ id: medicID })
          .select("first_name", "last_name", "email");

        results[i] = {
          ...results[i],
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email,
        };
      }

      res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  },
};
