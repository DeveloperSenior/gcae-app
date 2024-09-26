/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { inject } = require('../../src/utilities/Utilities');
const DefaultException = require('../../src/models/exception/DefaultException');


const appMock = {
    "appName": "AppTest",
    "appDescription": "Prueba de autogeneración",
    "repository": {},
    "auth": {
    },
    "cache": {
    },
    "dataBase": {
        "type":"MONGO"
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
                    "name": "engine",
                    "type": "Relation",
                    "items": {
                        "type": "Object",
                        "ref": "Engine"
                    },
                    "required": true
                },
            ]
        }
    ]
}
describe("Route Generator Service", () => {
    beforeEach(() => {

        jest.mock('../../src/services/IOFileService');
        const ioFileService = require('../../src/services/IOFileService');
        ioFileService.mockImplementation(() => {
            return {
                generateBaseProject: jest.fn(async (appfolder) => { }),
                generateFileFromTemplate: jest.fn(async (fileTemplateName, target) => ({ target: 'targetMock', data: 'contentMock', createFile: jest.fn() })),
                getContentFileFromTemplate: jest.fn(async (fileTemplateName) => ({ data: 'contentMock' })),
                sanitizeFileContent: jest.fn(async (file, target, isLocal = true) => ({ target: 'targetMock', content: 'contentMock', createFile: jest.fn() })),
                saveFile: jest.fn(async (basePath, folder) => { })
            }
        });

    });

    afterEach(() => {

        jest.restoreAllMocks();
        jest.clearAllMocks();

    });

    it("should method been call function generate Type MONGO", async () => {

        const service = require('../../src/services/RepositoryGeneratorService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'generate');
        await injectService.generate('appfolder', appMock.entities[0], appMock);
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function generate Type POSTGRES ", async () => {

        const service = require('../../src/services/RepositoryGeneratorService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'generate');
        appMock.dataBase.type = 'POSTGRES';
        await injectService.generate('appfolder', appMock.entities[0], appMock);
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function generate with exception", async () => {
        try {
            const ioFileService = require('../../src/services/IOFileService');
            ioFileService.mockImplementation(() => {
                return {
                }
            });
            const service = require('../../src/services/RepositoryGeneratorService');
            const injectService = inject(() => { }, service)();
            const spyService = jest.spyOn(injectService, 'generate');
            await injectService.generate('appfolder', {}, appMock);
            expect(spyService).toHaveBeenCalled();
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
        }
    });



});