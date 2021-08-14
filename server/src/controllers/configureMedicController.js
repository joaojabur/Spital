const knex = require("../database");
const NodeGeocoder = require("node-geocoder");
const { uploadS3 } = require("../services/s3");
const convertHourToMinutes = require("../utils/convertHoursToMinutes");
const pagarme = require("pagarme");
require("dotenv").config({ path: "./src/.env" });

const options = {
  provider: "google",
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = {
  async create(req, res, next) {
    try {
      const { medicID, userID } = req.query;
      let { medicDataConfigure } = req.body;
      medicDataConfigure = JSON.parse(medicDataConfigure);
      console.log(medicDataConfigure);

      if (medicDataConfigure.lat === null || medicDataConfigure.lon === null) {
        const [res] = await geocoder.geocode(medicDataConfigure.address);
        medicDataConfigure.lat = res.latitude;
        medicDataConfigure.lon = res.longitude;
      }

      let bank_account = await pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) =>
          client.bankAccounts.create({
            bank_code: medicDataConfigure.bankData.bankNumber,
            agencia: medicDataConfigure.bankData.agencyNumber,
            conta: medicDataConfigure.bankData.accountNumber,
            conta_dv: medicDataConfigure.bankData.accountCheckNumber,
            legal_name: medicDataConfigure.bankData.fullName,
            document_number: medicDataConfigure.bankData.cpf,
          })
        );

      let recipient = await pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) =>
          client.recipients.create({
            bank_account_id: bank_account.id,
            transfer_interval: "weekly",
            transfer_day: 5,
            transfer_enabled: true,
          })
        );

      for (let appointment of medicDataConfigure.appointments) {
        await knex("consult_type").insert({
          type: `${appointment.name}`,
          price: `${appointment.price}`,
          description: null,
          medicID: medicID,
        });
      }

      const scheduleID = await knex("schedules")
        .returning("id")
        .insert({ medicID: parseInt(medicID) });

      for (let sche of medicDataConfigure.schedule) {
        await knex("medic_schedule").insert({
          scheduleID: parseInt(scheduleID),
          week_day: sche.week_day,
          from: convertHourToMinutes(sche.from),
          to: convertHourToMinutes(sche.to),
        });
      }

      await knex("addresses").insert({
        address: medicDataConfigure.address,
        number: medicDataConfigure.number,
        lat: medicDataConfigure.lat,
        lon: medicDataConfigure.lon,
        userID: userID.toString(),
      });

      let profile = req.file;

      let profileExtension = profile.originalname.substring(
        profile.originalname.lastIndexOf("."),
        profile.originalname.length
      );

      await uploadS3({
        filename: `${medicID}/profile${profileExtension}`,
        bucket: "spital.medics.profile",
        data: profile.buffer,
      });

      await knex("medics")
        .update({
          recipientID: recipient.id,
          url: `http://spital.medics.profile.s3.amazonaws.com/${medicID}/profile${profileExtension}`,
          configured: true,
        })
        .where({ id: medicID });

      res
        .status(201)
        .send({ success: true, message: "Conta configurada com sucesso! ✅" });
    } catch (error) {
      next(error);
    }
  },
};
