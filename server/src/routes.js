const express = require("express");

const routes = express.Router();

const ClientController = require("./controllers/clientController");
const AppointmentController = require("./controllers/appointmentsController");
const MedicController = require("./controllers/medicController");
const MedicScheduleController = require("./controllers/medicScheduleController.js");
const isAuth = require("./middlewares/isAuth");
const clientController = require("./controllers/clientController");
const userController = require("./controllers/userController");
const reviewController = require("./controllers/reviewController");
const addressController = require("./controllers/addressController");
const consultTypeController = require("./controllers/consultTypeController");
const cardController = require("./controllers/cardController");

routes.get("/users", userController.index);
routes.delete("/users/:id", userController.delete);
routes.get("/users/:token", userController.emailVerification);
routes.post("/users/recover/", userController.forgetPassword);
routes.put("/users/recover/:token", userController.recoverPassword);
routes.get("/users/recover/:token", userController.verifyRecoverToken);

routes.post("/clients", ClientController.create);
routes.get("/clients", ClientController.index);
routes.put("/clients/:id", ClientController.update);
routes.delete("/clients/:userID", ClientController.delete);
routes.post("/clients/login", ClientController.login);
routes.get("/clients/auth", isAuth, clientController.auth);

routes.post("/medics", MedicController.create);
routes.get("/medics", MedicController.index);
routes.put("/medics/:userID", MedicController.update);
routes.delete("/medics/:userID", MedicController.delete);
routes.get("/medics/:area", MedicController.list);

routes.post("/appointments", AppointmentController.create);
routes.get("/appointments", AppointmentController.index);
routes.put("/appointments/:id", AppointmentController.update);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.post("/medic-schedule", MedicScheduleController.create);
routes.get("/medic-schedule", MedicScheduleController.index);
routes.put("/medic-schedule/:id", MedicScheduleController.update);
routes.delete("/medic-schedule/:id", MedicScheduleController.delete);

routes.post("/reviews", reviewController.create);
routes.get("/reviews", reviewController.index);
routes.put("/reviews", reviewController.update);
routes.delete("/reviews", reviewController.delete);

routes.post("/addresses", addressController.create);
routes.get("/addresses", addressController.index);
routes.put("/addresses", addressController.update);
routes.delete("/addresses", addressController.delete);

routes.post("/consult-type", consultTypeController.create);
routes.get("/consult-type", consultTypeController.index);
routes.put("/consult-type/:id", consultTypeController.update);
routes.delete("/consult-type/:id", consultTypeController.delete);

routes.post("/cards", cardController.create);
routes.get("/cards", cardController.index);

module.exports = routes;
