const express = require("express");
//controllers
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
//validations
const ongsValidations = require('./validations/ongs.validations')
const profileValidations = require('./validations/profile.validations')
const incidentsValidations = require('./validations/incidents.validations')
//routes
const Routes = express.Router();

//Session
Routes.post('/session', SessionController.create)

//Ongs Routes
Routes.get('/ongs', OngController.index);
Routes.post("/ongs", ongsValidations._BODY, OngController.create);

//Profile incidents Routes
Routes.get('/profile', profileValidations._HEADERS, ProfileController.index);

//Incidents Routes
Routes.get("/incidents", incidentsValidations._QUERY, IncidentsController.index);
Routes.post("/incidents", IncidentsController.create);
Routes.delete("/incidents/:id", incidentsValidations._PARAMS, IncidentsController.delete);

module.exports = Routes;