/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { HTTP_CODE } = require('../utilities/Constants');
const { inject } = require('../utilities/Utilities');
const userRepository = require('../db/UserRepository');
const userService = require('../services/UserService');
const dbClient = require('../db/config/config');
const { validateUser, } = require('../validators/UserValidator');

/**
 * signin user
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const signin = async (request, response) => {
    let pool;
    try {
        pool = await (await dbClient.connectDB()).connect();
        const authServicesInject = inject(userRepository, userService)(pool);
        const { body } = request;

        // Validate user Model
        const validate = validateUser(body);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }

        const userCreated = await authServicesInject.signin(body);

        return response.status(HTTP_CODE.CREATED).json(userCreated);

    } catch (error) {
        return response.status(HTTP_CODE.ERROR).json(error);

    } finally {
        pool.end();
    }

}

/**
 * login user
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const login = async (request, response) => {

    let pool;
    try {
        pool = await (await dbClient.connectDB()).connect();
        const userServicesInject = inject(userRepository, userService)(pool);
        const { body } = request;
        // Validate user Model
        const validate = validateUser(body);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }

        return response.status(HTTP_CODE.OK).json(await userServicesInject.login(body));

    } catch (error) {
        return response.status(error.code === HTTP_CODE.UNAUTHORIZED ? error.code : HTTP_CODE.ERROR).json({ message: error.message });

    } finally {
        pool.end();
    }
}


module.exports = { signin, login }