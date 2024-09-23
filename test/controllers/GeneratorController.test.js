const mockingoose = require('mockingoose');
const jwt = require('jsonwebtoken');
const httpMock = require('node-mocks-http');
const { HTTP_CODE, ERROR_MESSAGE } = require('../../src/utilities/Constants');
const DefaultException = require('../../src/models/exception/DefaultException');
const { AppModel } = require('../../src/models/AppModel');

const userSessionMock = { email: 'test@test.com', userId: '123123' };
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

//mock aws sdk
jest.mock('@aws-sdk/client-s3', () => {
    return {
        GetObjectCommand: jest.fn(),
        PutObjectCommand: jest.fn(),
        S3Client: jest.fn(() => ({
            send: jest.fn((_) => ({
                status: 200,
                Body: {
                    transformToString: jest.fn(() => ''),
                    transformToByteArray: jest.fn(() => '')
                }
            }))
        }))
    };
});

describe("Generator Controller", () => {

    beforeEach(() => {

        mockingoose(AppModel);

        jest.mock('../../src/services/GeneratorService');
        jest.mock('../../src/services/ControllerGeneratorService');
        jest.mock('../../src/services/ModelGeneratorService');
        jest.mock('../../src/services/RepositoryGeneratorService');
        jest.mock('../../src/services/RouteGeneratorService');
        jest.mock('../../src/services/ServiceGeneratorService');
        jest.mock('../../src/services/ValidatorGeneratorService');
        jest.mock('../../src/services/IOFileService');
        jest.mock('fs');

        const fs = require('fs');
        fs.readdirSync.mockImplementation(() => ([{
            path: 'mockPath',
            name: 'mockName',
            isFile: jest.fn(() => true)
        }]));

        const ioFileService = require('../../src/services/IOFileService');
        ioFileService.mockImplementation(() => {
            return {
                generateBaseProject: jest.fn(async (appfolder) => { }),
                generateFileFromTemplate: jest.fn(async (fileTemplateName, target) => { }),
                getContentFileFromTemplate: jest.fn(async (fileTemplateName) => { }),
                sanitizeFileContent: jest.fn(async (file, target, isLocal = true) => ({ target: 'targetMock', content: 'contentMock', createFile: jest.fn() })),
                saveFile: jest.fn(async (basePath, folder) => {
                    return {
                        file: '',
                        buffer: []
                    }
                })
            }
        });


        const service = require('../../src/services/GeneratorService');
        service.mockImplementation(() => {
            return {
                createApp: jest.fn(async (app, userSession) => appMock),
                getAppByName: jest.fn(async (appName, appfolder, userSession) => {
                    return {
                        file: '',
                        buffer: []
                    }
                })
            }
        });
        const controller = require('../../src/services/ControllerGeneratorService');
        controller.mockImplementation(() => {
            return {
                generate: jest.fn(async (appfolder, entityModel, appConfig) => { })
            }
        });
        const model = require('../../src/services/ModelGeneratorService');
        model.mockImplementation(() => {
            return {
                generate: jest.fn(async (appfolder, entityModel, appConfig) => { })
            }
        });
        const repository = require('../../src/services/RepositoryGeneratorService');
        repository.mockImplementation(() => {
            return {
                generate: jest.fn(async (appfolder, entityModel, appConfig) => { })
            }
        });
        const route = require('../../src/services/RouteGeneratorService');
        route.mockImplementation(() => {
            return {
                generate: jest.fn(async (appfolder, entityModel, appConfig) => { })
            }
        });
        const services = require('../../src/services/ServiceGeneratorService');
        services.mockImplementation(() => {
            return {
                generate: jest.fn(async (appfolder, entityModel, appConfig) => { })
            }
        });
        const validator = require('../../src/services/ValidatorGeneratorService');
        validator.mockImplementation(() => {
            return {
                generate: jest.fn(async (appfolder, entityModel, appConfig) => { })
            }
        });

    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    it("should method been call function main", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: appMock,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/GeneratorController');
        const spyController = jest.spyOn(controller, 'main');
        await controller.main(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.CREATED);

    });

    it("should method been call function main and exception throw jwt expired", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: appMock,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const error = new DefaultException('jwt expired');
        const controller = require('../../src/controllers/GeneratorController');
        const spyController = jest.spyOn(controller, 'main');
        await controller.main(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);

    });

    it("should method been call function main and throw exception ", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: appMock,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const error = new DefaultException('Error Mock Controller generate ');
        const controllerGenerator = require('../../src/services/ControllerGeneratorService');
        controllerGenerator.mockImplementation(() => {
            return {
                generate: jest.fn((appfolder, entityModel, appConfig) => { throw error })
            }
        });

        const controller = require('../../src/controllers/GeneratorController');
        const spyController = jest.spyOn(controller, 'main');
        await controller.main(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);

    });

    it("should method been call function main without entities", async () => {

        const mockResponse = httpMock.createResponse();
        appMock.entities = undefined;
        const mockRequest = httpMock.createRequest({
            body: appMock,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/GeneratorController');
        const spyController = jest.spyOn(controller, 'main');
        await controller.main(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();

    });

    it("should method been call function getApp", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            params: { appName: 'mock' },
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/GeneratorController');
        const spyController = jest.spyOn(controller, 'getApp');
        await controller.getApp(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.OK);


    });

    it("should method been call function getApp with Exception", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/GeneratorController');
        const spyController = jest.spyOn(controller, 'getApp');
        await controller.getApp(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);

    });

});