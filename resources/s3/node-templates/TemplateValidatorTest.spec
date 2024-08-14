/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { validate@EntityName@, validateErrors } = require('../../src/validators/@EntityName@Validator');
const { @EntityName@ } = require('../../src/models/dto/@EntityName@');
const bcrypt = require('bcrypt');

describe("@EntityName@ Validator Schema", () => {

    it("should validate false @entityName@ Schema, invalid instance path schema return Error List", async () => {

        const validate = validateErrors([{instancePath:'error/name', message: 'error path message'}]);
        expect(validate).toHaveLength(1);
        expect(validate[0]).toBe("error/name error path message");
    });


});