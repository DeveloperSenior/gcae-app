const {getValueTest} = require('../../src/utilities/ValuesTest');
const { toCamelCase } = require('js-convert-case');


describe("ValuesTest Utility", () => {

    it("should return String value Test", async () => {
        
        const mockField = {
            name: "dni",
            type: "String",
            pk: true,
            required: true
        }


        const response = getValueTest(mockField);
        expect(response).toBe(`'${toCamelCase(mockField.name)}Test'`);
    });

    it("should return Array String value Test", async () => {
        
        const mockField = {
            name: "colors",
            type: "array",
            items: {
                type: "String",
                ref: "Color"
            },
            pk: true,
            required: true
        }

        const response = getValueTest(mockField);
        expect(response).toBe(`['${toCamelCase(mockField.name)}Test1','${toCamelCase(mockField.name)}Test2','${toCamelCase(mockField.name)}Test3']`);
    });


    it("should return Array value Test", async () => {
        
        const mockField = {
            name: "colors",
            type: "array",
            items: {
                type: "Color",
                ref: "Color"
            },
            pk: true,
            required: true
        }

        const response = getValueTest(mockField);
        expect(response).toBe('[{}]');
    });

    it("should return Number type value Test", async () => {
        
        const mockField = {
            name: "City",
            type: "Number",
            pk: true,
            required: true
        }

        const response = getValueTest(mockField);
        expect(response).not.toBeNull();
    });

    it("should return other type value Test", async () => {
        
        const mockField = {
            name: "City",
            type: "Object",
            items: {
                type: "Color",
                ref: "Color"
            },
            pk: true,
            required: true
        }

        const response = getValueTest(mockField);
        expect(response).toBe(`'${toCamelCase(mockField.name)}Test'`);
    });

});