/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

/**
 * Module that defines the routers to be published in the container
 */
const routersApp = [
    require('./SwaggerRouteConf'),
    require('../GeneratorRoute'),
    /** Import routes here */
];

module.exports = routersApp