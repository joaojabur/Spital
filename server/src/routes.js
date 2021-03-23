const express = require("express");

const routes = express.Router();

const ClientController = require("./controllers/clientController");

routes.post("/clients", ClientController.index);

routes.get("/clients");
routes.post("/medics");
routes.get("/medics");

routes.post("/appointments");
routes.get("/appointments");

module.exports = routes;
