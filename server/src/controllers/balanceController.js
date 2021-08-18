const pagarme = require("pagarme");

module.exports = {
  async index(req, res, next) {
    try {
      const { recipientID } = req.query;

      let balance = await pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) => client.payables.all());

      console.log(balance);
      res.status(201).send(balance);
    } catch (error) {
      next(error);
    }
  },
};
