/**
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
    ENTITY_ISNT_SESSION: 'An unexpected exception was found in the validate App, the App does not belong to the user in session',
    ENTITY_NOT_FOUND: 'An unexpected exception was found in the validate App, the App does not found',
    NOT_FOUND: "Sorry can't find that!"

}

const HEADERS = {
    AUTHORIZATION: 'Authorization',
}

const DATE_FORMAT = {
    DEFAULT: 'YYYY-MM-DD'
}

const STATES = {
    INITIAL: 'P',
    ACTIVE: 'A',
    INACTIVE: 'I'
}

const DB_TYPE = (key) => {
    const types = new Map();
    types.set( "MONGO", "NO_SQL");
    types.set( "POSTGRES", "SQL");
    types.set( "MYSQL", "SQL");
    types.set( "ORACLE", "SQL");
    types.set( "DYNAMO", "NO_SQL");
    types.set( "COSMOS", "NO_SQL");
    return types.get(key);
}

const FIELD_TYPE = (key) => {
    const types = new Map();
    types.set( "STRING", "VARCHAR");
    types.set( "NUMBER", "NUMERIC");
    types.set( "DATE", "DATE");
    types.set( "OBJECT", "TEXT");
    types.set( "RELATIONSHIP", "INT4");
    return types.get(key);
}

const NUMBERS_TYPES = [ 'Numeric','Number', 'Integer', 'Int'];

const STRING_TYPES = ['Relationship','String', 'Date', 'Varchar', 'Text'];

module.exports = { HTTP_CODE,
                   HEADERS,
                   ERROR_CODE,
                   ERROR_TYPE,
                   ERROR_MESSAGE,
                   DATE_FORMAT,
                   STATES, DB_TYPE,
                   FIELD_TYPE,
                   NUMBERS_TYPES,
                   STRING_TYPES }