const express = require("express");
const crypto = require("crypto");
const connection = require("./database/connection");
//controllers
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
//routes
const Routes = express.Router();

Routes.post('/session', SessionController.create)

//Ongs Routes
Routes.get('/ongs', OngController.index);
Routes.post("/ongs", OngController.create);

//Incidents Routes
Routes.get("/incidents", IncidentsController.index);
Routes.post("/incidents", IncidentsController.create);
Routes.delete("/incidents/:id", IncidentsController.delete);

//Profile incidents Routes
Routes.get('/profile_case', ProfileController.index);
module.exports = Routes;
