const express = require("express");

const routes = express.Router();

const ClientController = require("./controllers/clientController");
const AppointmentController = require("./controllers/appointmentsController");
const MedicController = require("./controllers/medicController");
const MedicScheduleController = require("./controllers/medicScheduleController.js");
const isAuth = require("./middlewares/isAuth");
const clientController = require("./controllers/clientController");
const userController = require("./controllers/userController");

routes.get("/users", userController.index);

routes.post("/clients", ClientController.create);
routes.get("/clients", ClientController.index);
routes.put("/clients/:id", ClientController.update);
routes.delete("/clients/:id", ClientController.delete);
routes.post("/clients/login", ClientController.login);
routes.get("/clients/auth", isAuth, clientController.auth);

routes.post("/medics", MedicController.create);
routes.get("/medics", MedicController.index);
routes.put("/medics/:id", MedicController.update);
routes.delete("/medics/:id", MedicController.delete);
routes.get("/medics/:area", MedicController.list);

routes.post("/appointments", AppointmentController.create);
routes.get("/appointments", AppointmentController.index);
routes.put("/appointments/:id", AppointmentController.update);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.post("/medic-schedule", MedicScheduleController.create);
routes.get("/medic-schedule", MedicScheduleController.index);
routes.put("/medic-schedule/:id", MedicScheduleController.update);
routes.delete("/medic-schedule/:id", MedicScheduleController.delete);

module.exports = routes;
