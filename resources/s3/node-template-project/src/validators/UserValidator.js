/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Schema = require("fluent-json-schema");
const Ajv = require("ajv");
const userSchema = require("../models/schema/UserSchema.json")
const ajv = new Ajv({ allErrors: true });
// Ajv option allErrors is required
require("ajv-errors")(ajv);
const validateSchema = ajv.compile(userSchema);
const validateErrors = (errors) => errors.map(error => `${error.instancePath?error.instancePath:''} ${error.message}`.trim());

/**
 * validate JSON User
 * @param {*} body 
 * @returns 
 */
const validateUser = (body) => {
    return { isValid: validateSchema(body), errors: validateErrors(validateSchema.errors || []) }
}

module.exports = {validateErrors, validateUser, }