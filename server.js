/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const app = require("./app");
const { connectDB } = require('./src/db/config/config');
const DefaultException = require('./src/models/exception/DefaultException')
const { ERROR_MESSAGE,ERROR_CODE, ERROR_TYPE } = require('./src/utilities/Constants');
/**
 * Read environment variables from .env file local environment only
 */
const port = process.env.PORT || 3000;
const apiPath = process.env.API_PATH || '/api/v1';


// custom 404
app.use((req, res, next) => {
    const exception = new DefaultException(ERROR_MESSAGE.NOT_FOUND);
    exception.code = ERROR_CODE.NOT_FOUND;
    exception.type = ERROR_TYPE.NOT_FOUND;
    res.status(404).send(exception)
});

// custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    const exception = new DefaultException(err.stack);
    exception.code = ERROR_CODE.DEFAULT;
    exception.type = ERROR_TYPE.DEFAULT;
    res.status(500).send(exception)
});

/**
 * The express container is running
 */
app.listen(port, () => {
    console.log(`Server running port ${port} API ${apiPath}`);
    connectDB().then(response => console.log(`Data base connect: host: ${response.host} Name: ${response.name}`)).catch(err => console.error('Error abriendo conexion a la base de datos', err));
});
