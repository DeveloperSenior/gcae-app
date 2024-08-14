/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { pipe } = require('../utilities/Utilities');
const { HTTP_CODE } = require('../utilities/Constants');
const { getSession } = require('../utilities/Utilities');
const @entityName@Repository = require('../db/@EntityName@Repository');
const @entityName@Service = require('../services/@EntityName@Service');
const { validate@EntityName@,
    validateUpdate@EntityName@,
    validateDelete@EntityName@,
    validatePagerParameter
} = require('../validators/@EntityName@Validator');
const { @EntityName@Model } = require('../models/@EntityName@Model');

/**
 * create @EntityName@
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const create@EntityName@ = async (request, response) => {

    try {
        const @entityName@ServicesInject = pipe(@entityName@Repository, @entityName@Service)(@EntityName@Model);
        const { body } = request;
        const userSession = getSession(request);

        // Validate @entityName@ Model
        const validate = validate@EntityName@(body);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }

        const @entityName@Created = await @entityName@ServicesInject.create@EntityName@(body, userSession);

        return response.status(HTTP_CODE.CREATED).json(@entityName@Created);

    } catch (error) {

        return response.status(HTTP_CODE.ERROR).json(error);

    }

}

/**
 * get @EntityName@ 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */

const get@EntityName@ = async (request, response) => {

    try {
        const { params } = request;
        const userSession = getSession(request);
        const @entityName@ServicesInject = pipe(@entityName@Repository, @entityName@Service)(@EntityName@Model);
        const @entityName@s = await @entityName@ServicesInject.get@EntityName@(params,userSession);

        return response.status(HTTP_CODE.OK).json(@entityName@s);

    } catch (error) {

        return response.status(HTTP_CODE.ERROR).json(error);

    }
}

/**
 * get All @EntityName@ 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const getAll@EntityName@ = async (request, response) => {

    try {

        const userSession = getSession(request);        
        const @entityName@ServicesInject = pipe(@entityName@Repository, @entityName@Service)(@EntityName@Model);
        const @entityName@s = await @entityName@ServicesInject.getAll@EntityName@(userSession);

        return response.status(HTTP_CODE.OK).json(@entityName@s);

    } catch (error) {

        return response.status(HTTP_CODE.ERROR).json(error);

    }
}

/**
 * find all @EntityName@ Pager
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const get@EntityName@Pager = async (request, response) => {

    try {
        const { params, body } = request;

        // Validate pager parameters
        const validate = validatePagerParameter(params);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }

        const { pageSize, pageNumber } = params;

        const @entityName@ServicesInject = pipe(@entityName@Repository, @entityName@Service)(@EntityName@Model);
        body.isFull = true; // enable full query
        const all@EntityName@s = await @entityName@ServicesInject.get@EntityName@Pager(pageSize, pageNumber, body);

        return response.status(HTTP_CODE.OK).json(all@EntityName@s);

    } catch (error) {

        return response.status(HTTP_CODE.ERROR).json(error);

    }

}

/**
 * update @EntityName@
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const update@EntityName@ = async (request, response) => {

    try {
        const { body, params } = request;
        const { _id } = params;
        const userSession = getSession(request);

        // Validate @entityName@ Model to edit
        const validate = validateUpdate@EntityName@(_id, body);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }

        const @entityName@ServicesInject = pipe(@entityName@Repository, @entityName@Service)(@EntityName@Model);

        const edited@entityName@ = await @entityName@ServicesInject.update@EntityName@(_id, body, userSession);

        return response.status(HTTP_CODE.CREATED).json(edited@entityName@);

    } catch (error) {
        return response.status(HTTP_CODE.ERROR).json(error);

    }

}

/**
 * delete @EntityName@
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const delete@EntityName@ = async (request, response) => {
    try {
        const { params } = request;
        const { _id } = params;
        const userSession = getSession(request);

        // Validate @entityName@ Model to remove
        const validate = validateDelete@EntityName@(_id);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }

        const @entityName@ServicesInject = pipe(@entityName@Repository, @entityName@Service)(@EntityName@Model);

        await @entityName@ServicesInject.delete@EntityName@(_id, userSession);

        return response.status(HTTP_CODE.CREATED).send();

    } catch (error) {
        return response.status(HTTP_CODE.ERROR).json(error);

    }
}

module.exports = {
    create@EntityName@,
    update@EntityName@,
    delete@EntityName@,
    getAll@EntityName@,
    get@EntityName@,
    get@EntityName@Pager,
}