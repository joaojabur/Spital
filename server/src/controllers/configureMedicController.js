const knex = require("../database");
const NodeGeocoder = require("node-geocoder");
const { uploadS3 } = require('../services/s3');

const options = {
  provider: "google",
  apiKey: "AIzaSyDanmMSOYTtyp-Lbu43BVKiSW5EP8FRS9Y",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = {
  async create(req, res, next) {
    const moip = require("moip-sdk-node").default({
      accessToken: "7bd5812b36bd4cc89f69311f8badc7e9_v2",
      production: false,
    });

    try {
      const { medicID, userID } = req.query;
      let { bankData, invoiceAddress } = req.body;

      const [firstName, lastName] = bankData.fullName.split(" ");

      const [result] = await knex("medics")
        .where({ userID })
        .join("users", "users.id", "=", "medics.userID")
        .select("users.email", "medics.phoneNumber", "users.birth_date");
      const [ddd, phoneNumber] = result.phoneNumber.split(")");

      const formattedDDD = ddd.replace("(", "");
      const formattedPhoneNumber = phoneNumber.replace(/[- ]/g, "");

      moip.account
        .create({
          email: {
            address: result.email,
          },
          person: {
            name: firstName,
            lastName: lastName,
            taxDocument: {
              type: "CPF",
              number: bankData.cpf,
            },
            birthDate: bankData.birthDate,
            phone: {
              countryCode: "55",
              areaCode: formattedDDD,
              number: formattedPhoneNumber,
            },
            address: {
              street: invoiceAddress.street,
              streetNumber: invoiceAddress.streetNumber,
              district: invoiceAddress.district,
              zipCode: invoiceAddress.zipCode,
              city: invoiceAddress.city,
              state: invoiceAddress.state,
              country: "BRA",
            },
          },
          type: "MERCHANT",
          transparentAccount: true,
        })
        .then(async (response) => {
          await knex("medics")
            .update({ moipAccountID: response.body.id })
            .where({ id: medicID });

          let [
            profile,
            ...identification
          ] = req.files;
          
          let profileExtension = profile.originalname.substring(profile.originalname.lastIndexOf('.'), profile.originalname.length);

          await uploadS3({
            filename: `${medicID}/profile${profileExtension}`,
            bucket: 'spital.medics.profile',
            data: profile.buffer
          });

          for (let i in identification){
            let file = identification[i];
            let fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

            await uploadS3({
              filename: `${medicID}/identificacion/identificacion_i${profileExtension}`,
              bucket: 'spital.medics.profile',
              data: file.buffer
            });
          }
          
          res.json({
            success: true,
            message: "Sucesso!",
            accessToken: response.body.accessToken,
            moipAccountId: response.body.id,
          });
        });
    } catch (error) {
      next(error);
    }
  },

  async createBankAccount(req, res, next) {
    const { moipAccountId } = req.params;
    const { accessToken, medicID, userID } = req.query;

    let { bankData, appointments, number, address, lat, lon, schedule } =
      req.body;

    if (lat === null || lon === null) {
      const [res] = await geocoder.geocode(address);
      lat = res.latitude;
      lon = res.longitude;
    }

    const moip = require("moip-sdk-node").default({
      accessToken: accessToken,
      production: false,
    });

    try {
      moip.bankAccount
        .create(moipAccountId, {
          bankNumber: bankData.bankNumber,
          agencyNumber: bankData.agencyNumber,
          accountNumber: bankData.accountNumber,
          accountCheckNumber: bankData.accountCheckNumber,
          type: "CHECKING",
          holder: {
            taxDocument: {
              type: "CPF",
              number: bankData.cpf,
            },
            fullname: bankData.fullName,
          },
        })
        .then(async (response) => {
          await knex("medics")
            .update({ bankAccountID: response.body.id, configured: true })
            .where({ id: medicID });
        });

      for (let appointment of appointments) {
        await knex("consult_type").insert({
          type: `${appointment.name}`,
          price: `${appointment.price}`,
          description: null,
          medicID: medicID,
        });
      }

      console.log(schedule);

      const scheduleID = await knex("schedules")
        .returning("id")
        .insert({ medicID: parseInt(medicID) });

      for (let sche of schedule) {
        console.log(sche.from, convertHourToMinutes(sche.from));
        await knex("medic_schedule").insert({
          scheduleID: parseInt(scheduleID),
          week_day: sche.week_day,
          from: convertHourToMinutes(sche.from),
          to: convertHourToMinutes(sche.to),
        });
      }

      await knex("addresses").insert({
        address,
        number,
        lat,
        lon,
        userID: userID.toString(),
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
