const knex = require("../database");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");
const bcrypt = require("bcrypt");

module.exports = {
  async index(req, res, next) {
    try {
      let { userID, offset, lat, lon } = req.query;

      if (!offset) {
        offset = 1;
      }

      if (lat === "undefined" || lon === "undefined") {
        lat = -23.6821604;
        lon = -46.8754915;
      }

      if (!userID) {
        let results = await knex.select(
          knex.raw(`
            users.*, medic.*, addresses."userID", addresses.number, address, 
            (((acos(sin((${lat} *pi()/180)) * sin((lat * pi()/180)) 
            + cos((${lat}*pi()/180)) * cos((lat*pi()/180))
            * cos(((${lon} - lon) * pi()/180))))
              * 180/pi()) * 60 * 1.1515 * 1.609344) 
              as distance, (select avg(stars) from reviews where medic.id = reviews."medicID") as star
          FROM addresses
          join medics as medic
          on medic."userID" = addresses."userID"
          join users
          on medic."userID" = users.id
          Order by distance, star
          desc
          OFFSET ${offset * 30}
          LIMIT 30
        `)
        );

        let formatedResults = [];

        for (let result of results) {
          formatedResults.push({
            ...result,
            password: undefined,
            firstName: result.first_name,
            first_name: undefined,
            lastName: result.last_name,
            last_name: undefined,
            star: result.star ? result.star : "4.0",
          });
        }

        res.status(201).json(formatedResults);
      } else {
        const [result] = await knex("medics")
          .where({ userID })
          .join("users", "users.id", "=", "medics.userID")
          .select("users.*", "medics.*");

        return res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
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
      address,
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

        await knex("addresses").insert({
          address: address.location,
          number: address.number,
          lat: address.lat,
          lon: address.lon,
          userID: parseInt(userID),
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
    let { offset, lat, lon, distance } = req.query;
    const formattedArea = area.replace(/[-]/g, " ");

    if (!offset) {
      offset = 0;
    }

    if (lat === "undefined" || lon === "undefined") {
      lat = -23.6821604;
      lon = -46.8754915;
    }

    if (!distance || distance === "null") {
      distance = 999999;
    }

    try {
      console.log(offset);
      console.log(distance);
      console.log(formattedArea);
      let results = await knex.select(
        knex.raw(`
        *
        from (
          select 
            addresses."userID",
            addresses.number,
            address,
            (((acos(sin((${lat} *pi()/180)) * sin((lat * pi()/180)) 
          + cos((${lat}*pi()/180)) * cos((lat*pi()/180))
          * cos(((${lon} - lon) * pi()/180))))
            * 180/pi()) * 60 * 1.1515 * 1.609344) 
            as distance from addresses
        ) address
        join medics as medic
        on medic."userID" = address."userID"
        join users as "user"
        on medic."userID" = "user".id
        where distance <= ${distance} and area = '${formattedArea}'
        order by distance
        limit 30
        offset ${30 * offset}
      `)
      );

      let formatedResults = [];

      for (let result of results) {
        formatedResults.push({
          ...result,
          password: undefined,
          firstName: result.first_name,
          first_name: undefined,
          lastName: result.last_name,
          last_name: undefined,
        });
      }

      res.status(200).send(formatedResults);
    } catch (error) {
      next(error);
    }
  },
};
