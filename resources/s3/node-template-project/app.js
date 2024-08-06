/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

/**
 * create API express whit own routes
 */
const express = require('express');
const cors = require('cors');
const routerVersion = express.Router();
const routersApp = require('./src/routes/config/SuscriptionRoutesAppConf');

var app = express();

/**
 * Allowed cors
 */
app.use(cors());
/**
 * Parse payload (Request y Response) types JSON
 */
app.use(express.json());
/**
 * Read environment variables from .env file local environment only
 */
const apiPath = process.env.API_PATH || '/api/v1';
const apiVersion = process.env.VERSION || '1.0';

/**
 * List of routers to be exposed in the API
 */
const apiRoutesList = [routerVersion, ...routersApp];
app.use(apiPath, ...apiRoutesList);

/**
 * GET resource is defined to verify the available version of the API path /version
 */
routerVersion.get('/version', (req, res) => {
    res.json({ version: apiVersion });
});


//Run Node APP  
module.exports = app