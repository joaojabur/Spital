const knex = require("../database");
const moip = require("moip-sdk-node").default({
  accessToken: "7bd5812b36bd4cc89f69311f8badc7e9_v2",
  production: false,
});

module.exports = {
  async index(req, res, next) {
    try {
      const { bankaccountID } = req.query;
      console.log(bankaccountID);

      moip.bankAccount
        .getOne("BKA-03Q1YUJSD5HT")
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
    } catch (error) {}
  },

  async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },
};
