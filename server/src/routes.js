const express = require("express");

const routes = express.Router();

const ClientController = require("./controllers/clientController");
const AppointmentController = require("./controllers/appointmentsController");
const MedicController = require("./controllers/medicController");
const LoginClientController = require("./controllers/loginClientController");

routes.post("/clients", ClientController.create);
routes.get("/clients", ClientController.index);
routes.put("/clients/:id", ClientController.update);
routes.delete("/clients/:id", ClientController.delete);

routes.post("/medics", MedicController.create);
routes.get("/medics", MedicController.index);
routes.put("/medics/:id", MedicController.update);
routes.delete("/medics/:id", MedicController.delete);

routes.post("/appointments", AppointmentController.create);
routes.get("/appointments", AppointmentController.index);
routes.put("/appointments/:id", AppointmentController.update);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.post("/login-client", LoginClientController.create);

module.exports = routes;
