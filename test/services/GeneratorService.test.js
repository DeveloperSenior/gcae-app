/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { inject } = require('../../src/utilities/Utilities');
const DefaultException = require('../../src/models/exception/DefaultException')
const { DATE_FORMAT, ERROR_MESSAGE, ERROR_CODE, ERROR_TYPE } = require('../../src/utilities/Constants');

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
    ],
    "createdAt": "2024-08-09",
    "updatedAt": "2024-09-09"
}
const userSessionMock = { email: 'test@test.com', userId: '123123' };

describe("Generator Service", () => {
    beforeEach(() => {

        jest.mock('../../src/services/IOFileService');
        const ioFileService = require('../../src/services/IOFileService');
        ioFileService.mockImplementation(() => {
            return {
                generateBaseProject: jest.fn(async (appfolder) => { }),
                generateFileFromTemplate: jest.fn(async (fileTemplateName, target) => ({ target: 'targetMock', data: 'contentMock', createFile: jest.fn() })),
                getContentFileFromTemplate: jest.fn(async (fileTemplateName) => { }),
                sanitizeFileContent: jest.fn(async (file, target, isLocal = true) => ({ target: 'targetMock', content: 'contentMock', createFile: jest.fn() })),
                saveFile: jest.fn(async (basePath, folder) => { }),
                getAppFile: jest.fn(async (appName) => {
                    return { fileName: 'Mockfile.mock', buffer: [] }
                }),
            }
        });

        jest.mock('../../src/db/GeneratorRepository');
        const repository = require('../../src/db/GeneratorRepository');
        repository.mockImplementation(() => {
            return {
                createApp: jest.fn(async (app) => appMock),
                updateApp: jest.fn(async (_id, userId, app) => { }),
                deleteApp: jest.fn(async (_id, userId) => { }),
                getAllApp: jest.fn(async (app) => { }),
                getApp: jest.fn(async (app) => { }),
                getAppById: jest.fn(async (_id, userId) => { }),
                getAppByName: jest.fn(async (app) => { }),
                getAppPager: jest.fn(async (pageSize, pageNumber, filter) => { }),
            }
        });

    });

    afterEach(() => {

        jest.restoreAllMocks();
        jest.clearAllMocks();

    });

    it("should method been call function createApp", async () => {

        const service = require('../../src/services/GeneratorService');
        const repository = require('../../src/db/GeneratorRepository');

        const injectService = inject(repository, service)();
        const spyService = jest.spyOn(injectService, 'createApp');
        await injectService.createApp(appMock, userSessionMock);
        expect(spyService).toHaveBeenCalled();

    });

    it("should create App", async () => {

        const service = require('../../src/services/GeneratorService');
        const repository = require('../../src/db/GeneratorRepository');

        const injectService = inject(repository, service)();
        const response = await injectService.createApp(appMock, userSessionMock);
        expect(response).toEqual(appMock);
        expect(response.createdAt).toEqual('2024-08-09');

    });

    it("should update App", async () => {

        const service = require('../../src/services/GeneratorService');
        const repository = require('../../src/db/GeneratorRepository');

        repository.mockImplementation(() => {
            return {
                updateApp: jest.fn(async (_id, userId, app) => appMock),
                getAppByName: jest.fn(async (app) => appMock)
            }
        });

        const injectService = inject(repository, service)();
        const response = await injectService.createApp(appMock, userSessionMock);
        expect(response).toEqual(appMock);
        expect(response.updatedAt).toEqual('2024-09-09');

    });

    it("should method been call function getAppByName", async () => {

        const service = require('../../src/services/GeneratorService');
        const repository = require('../../src/db/GeneratorRepository');
        repository.mockImplementation(() => {
            return {
                getAppByName: jest.fn(async (app) => appMock)
            }
        });
        const injectService = inject(repository, service)();
        const spyService = jest.spyOn(injectService, 'getAppByName');
        await injectService.getAppByName('Mock', 'AppMock', userSessionMock);
        expect(spyService).toHaveBeenCalled();

    });

    it("should get App By Name", async () => {

        const service = require('../../src/services/GeneratorService');
        const repository = require('../../src/db/GeneratorRepository');
        repository.mockImplementation(() => {
            return {
                getAppByName: jest.fn(async (app) => appMock)
            }
        });
        const injectService = inject(repository, service)();
        const response = await injectService.getAppByName('Mock', 'AppMock', userSessionMock);
        expect(response.fileName).toEqual('Mockfile.mock');
        expect(response.buffer).toStrictEqual([]);

    });

    it("should not get App By Name, app not exist", async () => {

        const service = require('../../src/services/GeneratorService');
        const repository = require('../../src/db/GeneratorRepository');
        const injectService = inject(repository, service)();

        await injectService.getAppByName('Mock', 'AppMock', userSessionMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(ERROR_MESSAGE.ENTITY_ISNT_SESSION);
            expect(error.code).toMatch(ERROR_CODE.VALIDATE);
        });
    });

});