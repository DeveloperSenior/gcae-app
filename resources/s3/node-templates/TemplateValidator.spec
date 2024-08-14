/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Ajv = require("ajv");
const { DATE_FORMAT } = require('../utilities/Constants');
const @entityName@Schema = require("../models/schemas/@EntityName@Schema.json");
const moment = require('moment');

const ajv = new Ajv({ allErrors: true });
// Ajv option allErrors is required
require("ajv-errors")(ajv);



const validateSchema = ajv.compile(@entityName@Schema);
const validateErrors = (errors) => errors.map(error => `${error.instancePath ? error.instancePath : ''} ${error.message}`.trim());


const validate@EntityName@ = (body) => {
    return { isValid: validateSchema(body), errors: validateErrors(validateSchema.errors || []) }
}

const validateUpdate@EntityName@ = (_id, body) => {
    const errors = [];
    let isValid = true;
    if (!body) { errors.push("must have required body request"); isValid = false; }
    if (!_id) { errors.push("must have required property '_id'"); isValid = false; }

    return { isValid: isValid, errors: errors }

}

const validateDelete@EntityName@ = (_id) => {
    const errors = [];
    let isValid = true;
    if (!_id) { errors.push("must have required property path '_id'"); isValid = false; }

    return { isValid: isValid, errors: errors }

}

const validatePagerParameter = (params) => {
    const errors = [];
    let isValid = true;
    if (!params.pageSize) { errors.push("must have required property path 'pageSize'"); isValid = false; }
    if (!params.pageNumber) { errors.push("must have required property path 'pageNumber'"); isValid = false; }
    return { isValid: isValid, errors: errors }
}

module.exports = {
    validateErrors,
    validate@EntityName@,
    validateUpdate@EntityName@,
    validateDelete@EntityName@,
    validatePagerParameter
}