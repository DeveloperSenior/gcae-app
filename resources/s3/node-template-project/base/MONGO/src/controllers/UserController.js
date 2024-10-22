/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { HTTP_CODE } = require('../utilities/Constants');
const { inject } = require('../utilities/Utilities');
const userRepository = require('../db/UserRepository');
const userService = require('../services/UserService');
const { UserModel } = require('../models/UserModel');
const { validateUser, } = require('../validators/UserValidator');

/**
 * signin user
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const signin = async (request, response) => {

    try {
        const authServicesInject = inject(userRepository, userService)(UserModel);
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

    }

}

/**
 * login user
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const login = async (request, response) => {

    try {
        const userServicesInject = inject(userRepository, userService)(UserModel);
        const { body } = request;
        // Validate user Model
        const validate = validateUser(body);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }
        try {
            const login = await userServicesInject.login(body);

            const { tokenId } = login;

            if (tokenId) {
                return response.status(HTTP_CODE.OK).json(login);
            }

        } catch (error) {
            return response.status(HTTP_CODE.UNAUTHORIZED).json(error);
        }

    } catch (error) {

        return response.status(HTTP_CODE.ERROR).json({ message: error.message });

    }
}


module.exports = { signin, login }