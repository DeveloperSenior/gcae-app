/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { inject } = require('../../src/utilities/Utilities');

const appMock = {
    "appName": "AppTest",
    "appDescription": "Prueba de autogeneración",
    "repository": {
    },
    "auth": {
    },
    "cache": {
    },
    "dataBase": {
    },
    "entities": [
        {
            "name": "Car",
            "description": "Some description",
            "fields": [
                {
                    "name": "colors",
                    "type": "array",
                    "items": {
                        "type": "Object",
                        "ref": "Color"
                    },
                    "pk": true,
                    "required": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "required": false
                },
                {
                    "name": "Engine",
                    "type": "array",
                    "items": {
                        "type": "String",
                        "ref": null
                    },
                    "required": true
                }
            ]
        }
    ]
}
describe("Validator Generator Service", () => {
    beforeEach(() => {

        jest.mock('../../src/services/IOFileService');
        const ioFileService = require('../../src/services/IOFileService');
        ioFileService.mockImplementation(() => {
            return {
                generateBaseProject: jest.fn(async (appfolder) => { }),
                generateFileFromTemplate: jest.fn(async (fileTemplateName, target) => ({ target: 'targetMock', data: 'contentMock', createFile: jest.fn() })),
                getContentFileFromTemplate: jest.fn(async (fileTemplateName) => ({ data:'contentMock' })),
                sanitizeFileContent: jest.fn(async (file, target, isLocal = true) => ({ target: 'targetMock', content: 'contentMock', createFile: jest.fn() })),
                saveFile: jest.fn(async (basePath, folder) => { })
            }
        });

    });

    afterEach(() => {

        jest.restoreAllMocks();
        jest.clearAllMocks();

    });

    it("should method been call function generate", async () => {

        const service = require('../../src/services/ValidatorGeneratorService');
        const injectService = inject(() => { },service)();
        const spyService = jest.spyOn(injectService, 'generate');
        await injectService.generate('appfolder', appMock.entities[0], appMock);
        expect(spyService).toHaveBeenCalled();

    });

});