const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./src/.env" });

let transproter = nodemailer.createTransport({
  host: process.env.NODEMAILER_SERVICE,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports = transproter;
