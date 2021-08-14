const pagarme = require("pagarme");

module.exports = {
  async index(req, res, next) {
    try {
      const { recipientID } = req.query;

      let recipient = await pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) => client.recipients.find({ id: recipientID }));

      res.status(200).send(recipient);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { recipientID } = req.params;
      const { bankAccount } = req.body;

      let recipient = await pagarme.client
        .connect({ api_key: process.env.PAGARME_API_KEY })
        .then((client) =>
          client.recipients.update({
            id: recipientID,
            bank_account: {
              bank_code: bankAccount.bank_code,
              agencia: bankAccount.agencia,
              conta: bankAccount.conta,
              conta_dv: bankAccount.conta_dv,
              document_number: bankAccount.document_number,
              legal_name: bankAccount.legal_name,
            },
          })
        );

      res.status(201).send(recipient);
    } catch (error) {
      next(error);
    }
  },
};
