/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const app = require("./app");
const { connectDB } = require('./src/db/config/config');

/**
 * Read environment variables from .env file local environment only
 */
const port = process.env.PORT || 3000;
const apiPath = process.env.API_PATH || '/api/v1';

/**
 * The express container is running
 */
app.listen(port, () => {
    console.log(`Server running port ${port} API ${apiPath}`);
    connectDB().then(response => console.log(`Data base connect: host: ${response.host} Name: ${response.name}`)).catch(err => console.error('Error abriendo conexion a la base de datos', err));
});
