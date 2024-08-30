/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { AppModel } = require('../../src/models/AppModel');
const mockingoose = require('mockingoose');
const { App } = require('../../src/models/dto/App');
const DefaultException = require('../../src/models/exception/DefaultException');
const moment = require('moment');
const { DATE_FORMAT, STATES } = require('../../src/utilities/Constants');


const userSessionMock = { email: 'test@test.com', userId: '6615b9d07547e0fc5387077c' };
const userMock = { name: 'TestUser', email: userSessionMock.email, _id: userSessionMock.userId };
const appMock = new App.Builder()
    .withId('6619738195230033669607f9')
    .withAppName('testApp')
    .withAppPort(22)
    .withAppDescription('test App')
    .withAuthor('dev@test.com')
    .withVersion('1.0')
    .withRepository({})
    .withCache({})
    .withDataBase({})
    .withEntities({})
    .withUser(userMock)
    .withCreatedAt(moment().format(DATE_FORMAT.DEFAULT))
    .build();

const appPagerMock =
    {
        "actualPage": 1,
        "totalPage": 1,
        "prevPage": null,
        "nextPage": 1,
        "data": [
            appMock
        ]
    }
;

describe("Generator Repository DB", () => {

    afterEach(() => {
        appMock.state = STATES.INITIAL;
        jest.clearAllMocks();

    });

    it("should create App", async () => {

        /**
         * Mock response created App with save function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appMock, 'save');
        mockingoose(AppModel).toReturn(appMock, 'findOne');

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).createApp(appMock)
        expect(response).toBeInstanceOf(Object);
    });

    it("should not create App, error save function", async () => {

        /**
         * Mock response created app with save function ODM mongoose
         * true isn't monogo document return save function
         */
        mockingoose(AppModel).toReturn(true, 'save');

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        await GeneratorRepository(AppModel).createApp(appMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get App", async () => {

        /**
         * Mock response update app with updateOne function ODM mongoose
         */
        appMock.updatedAt = appMock.createdAt;
        mockingoose(AppModel).toReturn(appMock, 'updateOne');
        mockingoose(AppModel).toReturn(appMock, 'findOne');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        appMock._id = '6619738195230033669607f9';
        const response = await GeneratorRepository(AppModel).getApp(appMock);
        expect(response).toBeInstanceOf(Object);
    });

    it("should not get App, error updateOne", async () => {

        /**
         * Mock response update app with updateOne function ODM mongoose
         */

        mockingoose(AppModel).toReturn(true, 'updateOne');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        appMock._id = undefined;
        await GeneratorRepository(null).getApp(appMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get App By Id & IdUser", async () => {

        /**
         * Mock response retrieve app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appMock, 'findOne');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).getAppById(appMock._id, appMock.user);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get App By Id & idUser, error findOne", async () => {

        /**
         * Mock response retrieve app with findOne function ODM mongoose
         */

        mockingoose(AppModel).toReturn(true, 'findOne');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await GeneratorRepository(null).getAppById(appMock._id, appMock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get App By Name & idUser", async () => {

        /**
         * Mock response retrieve app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appMock, 'findOne');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).getAppByName(appMock.appName, appMock.user);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get App By Name & idUser, error findOne", async () => {

        /**
         * Mock response retrieve app with findOne function ODM mongoose
         */

        mockingoose(AppModel).toReturn(true, 'findOne');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await GeneratorRepository(null).getAppByName(appMock.appName, appMock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get All App", async () => {

        /**
         * Mock response getAll app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn([appMock], 'find');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).getAllApp(appMock);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get All App, error find", async () => {

        /**
         * Mock response retrieve app with findOne function ODM mongoose
         */

        mockingoose(AppModel).toReturn(true, 'find');
        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await GeneratorRepository(null).getAllApp(appMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get App by Pager", async () => {

        /**
         * Mock response retrieve app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appPagerMock, 'paginate');

        const paginate = jest.spyOn(AppModel, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[appMock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {isFull: true, createdAt: appMock.createdAt};

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).getAppPager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get App by Pager without filter", async () => {

        /**
         * Mock response retrieve app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appPagerMock, 'paginate');

        const paginate = jest.spyOn(AppModel, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[appMock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).getAppPager(pageSize, pageNumber, null);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get App by Pager without params filter", async () => {

        /**
         * Mock response retrieve app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appPagerMock, 'paginate');

        const paginate = jest.spyOn(AppModel, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[appMock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {};

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).getAppPager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get App by Pager, error pagination", async () => {

        /**
         * Mock response retrieve app with find function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appPagerMock, 'paginate');

        const paginate = jest.spyOn(AppModel, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[appMock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {
        };

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await GeneratorRepository(null).getAppPager(pageSize, pageNumber, filter).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should update App", async () => {

        /**
         * Mock response update app with findOneAndUpdate function ODM mongoose
         */
        mockingoose(AppModel).toReturn(appMock, 'findOneAndUpdate');
        mockingoose(AppModel).toReturn(appMock, 'findOne');

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).updateApp(appMock._id,appMock.user,appMock)
        expect(response).toBeInstanceOf(Object);
    });

    it("should not update App, error findOneAndUpdate function", async () => {

        /**
         * Mock response created app with save function ODM mongoose
         * true isn't monogo document return save function
         */
        mockingoose(AppModel).toReturn(true, 'findOneAndUpdate');

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        await GeneratorRepository(AppModel).updateApp(appMock._id,appMock.user,appMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should delete App", async () => {

        /**
         * Mock response delete App with deleteOne function ODM mongoose
         */
        mockingoose(AppModel).toReturn(null, 'deleteOne');

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const response = await GeneratorRepository(AppModel).deleteApp(appMock._id,appMock.user)
        expect(response).toBeNull();
    });

    it("should not delete App, error deleteOne function", async () => {

        /**
         * Mock response deleted App with save function ODM mongoose
         * true isn't monogo document return save function
         */
        mockingoose(AppModel).toReturn(true, 'deleteOne');

        const GeneratorRepository = require('../../src/db/GeneratorRepository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        await GeneratorRepository(null).deleteApp(appMock._id,appMock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

});