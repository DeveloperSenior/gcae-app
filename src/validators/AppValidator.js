/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Schema = require("fluent-json-schema");
const Ajv = require("ajv");
const appSchema = require("../models/schemas/AppSchema")
const ajv = new Ajv({ allErrors: true });
// Ajv option allErrors is required
require("ajv-errors")(ajv);
const validateSchema = ajv.compile(appSchema);
const validateErrors = (errors) => errors.map(error => `${error.instancePath?error.instancePath:''} ${error.message} ${error.params?.allowedValues || ''}`.trim());

/**
 * validate JSON App
 * @param {*} body 
 * @returns 
 */
const validateApp = (body) => {
    return { isValid: validateSchema(body), errors: validateErrors(validateSchema.errors || []) }
}

module.exports = {validateErrors, validateApp, }