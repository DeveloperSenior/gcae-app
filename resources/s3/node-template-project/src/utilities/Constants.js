/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const HTTP_CODE = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    CREATED: 201,
    OK: 200,
    NO_CONTENT: 204,
    ERROR: 500,
    MOVED_PERMANENTLY: 301
}

const ERROR_CODE = {
    DEFAULT: 'API-01-001',
    ACCESS: 'API-02-001',
    VALIDATE: 'API-03-001',
    NOT_FOUND: 'API-04-404'
}

const ERROR_TYPE = {
    DEFAULT: 'Technical',
    ACCESS: 'Access',
    VALIDATE: 'Validate',
    NOT_FOUND: 'NOT FOUND'
}

const ERROR_MESSAGE = {
    DEFAULT: 'An unexpected exception was found in the application. Review details in the log',
    ACCESS: 'An unexpected exception was found in the Access, put valid Bearer token Authorization Header',
    ENTITY_ISNT_SESSION: 'An unexpected exception was found in the validate ENTITY, the ENTITY does not belong to the user in session',
    ENTITY_NOT_FOUND: 'An unexpected exception was found in the validate ENTITY, the ENTITY does not found',
    NOT_FOUND: "Sorry can't find that!"

}

const HEADERS = {
    AUTHORIZATION: 'Authorization',
}

const DATE_FORMAT = {
    DEFAULT : 'YYYY-MM-DD'
}

const STATES = {
    INITIAL: 'P', 
    ACTIVE: 'A',
    INACTIVE: 'I'
}

module.exports = { HTTP_CODE, HEADERS, ERROR_CODE, ERROR_TYPE, ERROR_MESSAGE, DATE_FORMAT, STATES }