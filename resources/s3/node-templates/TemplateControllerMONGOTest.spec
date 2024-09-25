/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { @EntityName@Model } = require('../../src/models/@EntityName@Model');
const mockingoose = require('mockingoose');
const { @EntityName@ } = require('../../src/models/dto/@EntityName@');
const jwt = require('jsonwebtoken');
const httpMock = require('node-mocks-http');
const { HTTP_CODE, ERROR_MESSAGE } = require('../../src/utilities/Constants');
const DefaultException = require('../../src/models/exception/DefaultException');



const userSessionMock = { email: 'test@test.com', userId: '123123' };
const @entityName@Mock = new @EntityName@.Builder()
    @attrModelBuild@
    .build();
const @entityName@PagerMock = [
    {
        "actualPage": 1,
        "totalPage": 1,
        "prevPage": null,
        "nextPage": 1,
        "data": [
            @entityName@Mock
        ]
    }
];

describe("@EntityName@ Controller", () => {

    beforeEach(() => {

        mockingoose(@EntityName@Model);

        jest.mock('../../src/services/@EntityName@Service');
        const service = require('../../src/services/@EntityName@Service');
        service.mockImplementation(() => {
            return {
                create@EntityName@: jest.fn(async (@entityName@, userSession) => @entityName@Mock),
                get@EntityName@: jest.fn(async (@entityName@, userSession) => @entityName@Mock),
                getAll@EntityName@: jest.fn(async (userSession) => [@entityName@Mock]),
                get@EntityName@Pager: jest.fn(async (pageSize, pageNumber, body) => @entityName@PagerMock),
                update@EntityName@: jest.fn(async (_id, @entityName@, userSession) => @entityName@Mock),
                delete@EntityName@: jest.fn(async (_id, userSession) => { })
            }
        });

    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    it("should method been call function create@EntityName@", async () => {

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@Mock,
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'create@EntityName@');
        await controller.create@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();


    });

    it("should method been create @EntityName@", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@Mock,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'create@EntityName@');
        await controller.create@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.CREATED);
        expect(mockResponse._getJSONData()).toEqual(@entityName@Mock);


    });

    it("should method not been create @EntityName@ with error", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@Mock,
            headers: { 'Authorization': 'Bearer' }

        });
        const error = new DefaultException('jwt must be provided');

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'create@EntityName@');
        await controller.create@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);


    });

    it("should method not been create @EntityName@ with error payload", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: {},
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const error = {
            message: [

                @attrModelBuildRequired@
            ]
        }

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'create@EntityName@');
        await controller.create@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.BAD_REQUEST);
        expect(mockResponse._getJSONData()).toEqual(error);


    });

    it("should method been call get@EntityName@", async () => {

        const @entityName@Mock = new @EntityName@.Builder()
            @attrModelBuild@
            /** add params filters to builder here*/
            .build();

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@Mock,
            params: {},
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@');
        await controller.get@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();


    });

    it("should method been get @EntityName@", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@Mock,
            params: {},
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@');
        await controller.get@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.OK);
        expect(mockResponse._getJSONData()).toEqual(@entityName@Mock);


    });

    it("should method not been get @EntityName@ error payload", async () => {

        const @entityName@Mock = new @EntityName@.Builder().build();

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@Mock,
            params: {},
            headers: { 'Authorization': 'Bearer' }

        });

        const error = new DefaultException('jwt must be provided');

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@');
        await controller.get@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);


    });

    it("should method been call getAll@EntityName@", async () => {

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'getAll@EntityName@');
        await controller.getAll@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();


    });

    it("should method been get All @EntityName@", async () => {

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'getAll@EntityName@');
        await controller.getAll@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.OK);
        expect(mockResponse._getJSONData()).toEqual([@entityName@Mock]);


    });

    it("should method not been get all @entityName@ with error jwt expired", async () => {

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });
        const error = new DefaultException('jwt expired');
        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'getAll@EntityName@');
        await controller.getAll@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);


    });

    it("should method been call get@EntityName@Pager", async () => {

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: {},
            params: { pageSize: 1, pageNumber: 1 },
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@Pager');
        await controller.get@EntityName@Pager(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();


    });

    it("should method been get @EntityName@ Pager data", async () => {

        const @entityName@FilterMock = new @EntityName@.Builder()
            /** add params filters to builder here*/
            .build();

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@FilterMock,
            params: { pageSize: 1, pageNumber: 1 },
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@Pager');
        await controller.get@EntityName@Pager(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.OK);
        expect(mockResponse._getJSONData()).toBeInstanceOf(Array);
        expect(mockResponse._getJSONData()).toHaveLength(1);
        expect(mockResponse._getJSONData()[0]).toHaveProperty('totalPage', 1);
        expect(mockResponse._getJSONData()[0]).toHaveProperty('data');

    });

    it("should method been get @EntityName@ Pager params error", async () => {

        const @entityName@FilterMock = new @EntityName@.Builder()
            /** add params filters to builder here*/
            .build();

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@FilterMock,
            params: {},
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const error = {
            message: [
                        "must have required property path 'pageSize'",
                        "must have required property path 'pageNumber'",
                     ]
        };

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@Pager');
        await controller.get@EntityName@Pager(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.BAD_REQUEST);
        expect(mockResponse._getJSONData()).toEqual(error);

    });

    it("should method been get @EntityName@ Pager error", async () => {

        const @entityName@FilterMock = new @EntityName@.Builder()
            /** add params filters to builder here*/
            .build();

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@FilterMock,
            params: { pageSize: 1, pageNumber: 1 },
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const service = require('../../src/services/@EntityName@Service');
        service.mockImplementation(() => {
            return {
                get@EntityName@Pager: jest.fn(async (pageSize, pageNumber, body) => {
                    throw new DefaultException(ERROR_MESSAGE.DEFAULT)
                }),
            }
        });

        const error = new DefaultException(ERROR_MESSAGE.DEFAULT);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'get@EntityName@Pager');
        await controller.get@EntityName@Pager(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);

    });

    it("should method been call update@EntityName@", async () => {

        const @entityName@UpdateMock = new @EntityName@.Builder()
            @attrModelBuild@
            .build();
        
        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@UpdateMock,
            params: { _id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'update@EntityName@');
        await controller.update@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();


    });

    it("should method been update @EntityName@", async () => {

        const @entityName@UpdateMock = new @EntityName@.Builder()
            @attrModelBuild@
            .build();

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: @entityName@UpdateMock,
            params: { _id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });


        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'update@EntityName@');
        await controller.update@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.CREATED);
        expect(mockResponse._getJSONData()).toEqual(@entityName@Mock);


    });

    it("should method not been update @EntityName@ without '_id' & 'body' param error", async () => {

        const @entityName@UpdateMock = new @EntityName@.Builder()
            /** add params filters to builder here*/
            .build();

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: null,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });


        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const error = { message: ["must have required property '_id'"] };

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'update@EntityName@');
        await controller.update@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.BAD_REQUEST);
        expect(mockResponse._getJSONData()).toEqual(error);


    });

    it("should method not been update @EntityName@ without error jwt expired", async () => {

        const @entityName@UpdateMock = new @EntityName@.Builder()
            /** add params filters to builder here*/
            .build();

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            body: null,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const error = new DefaultException('jwt expired');

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'update@EntityName@');
        await controller.update@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);


    });

    it("should method been call delete@EntityName@", async () => {

        /** Mock JWT token */
        const tokenIdMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI';
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            params: { _id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
            headers: { 'Authorization': `Bearer ${tokenIdMock}` }
        });

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'delete@EntityName@');
        await controller.delete@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();


    });

    it("should method been delete @EntityName@", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            params: { _id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'delete@EntityName@');
        await controller.delete@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.CREATED);


    });

    it("should method not been delete @EntityName@ without '_id' param error", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => userSessionMock);

        const error = { message: ["must have required property path '_id'"] };

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'delete@EntityName@');
        await controller.delete@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.BAD_REQUEST);
        expect(mockResponse._getJSONData()).toEqual(error);

    });

    it("should method not been delete @EntityName@ error jwt expired", async () => {

        const mockResponse = httpMock.createResponse();

        const mockRequest = httpMock.createRequest({
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MTE4NTA4MzcsImV4cCI6MTcxMTg1NDQzN30.gInF0fCogGhQzO-kWVP9xis4_OGopuclZFM3HzRYcoI' }
        });

        const error = new DefaultException('jwt expired');

        const controller = require('../../src/controllers/@EntityName@Controller');
        const spyController = jest.spyOn(controller, 'delete@EntityName@');
        await controller.delete@EntityName@(mockRequest, mockResponse);
        expect(spyController).toHaveBeenCalled();
        expect(mockResponse.statusCode).toEqual(HTTP_CODE.ERROR);
        expect(mockResponse._getJSONData()).toEqual(error);

    });

});