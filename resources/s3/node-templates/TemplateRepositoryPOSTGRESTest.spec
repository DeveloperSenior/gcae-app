/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Pool = require("pg").Pool;
const { @EntityName@ } = require('../../src/models/dto/@EntityName@');
const DefaultException = require('../../src/models/exception/DefaultException');
const moment = require('moment');
const { DATE_FORMAT, STATES } = require('../../src/utilities/Constants');


const userSessionMock = { email: 'test@test.com', userId: '6615b9d07547e0fc5387077c' };
const userMock = { name: 'TestUser', email: userSessionMock.email, _id: userSessionMock.userId };

const @entityName@Mock = new @EntityName@.Builder()
    .withId('6619738195230033669607f9')
    .withUser(userMock)
    .withCreatedAt(moment().format(DATE_FORMAT.DEFAULT))
     @attrModelBuild@
    .build();

jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(),
        query: jest.fn(),
        release: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});



describe("@EntityName@ Repository DB", () => {
    let client;

    beforeEach(() => {
        client = new Pool()
    });

    afterEach(() => {
        @entityName@Mock.state = STATES.INITIAL;
        jest.clearAllMocks();

    });

    it("should create @EntityName@", async () => {

        /**
         * Mock response created @EntityName@ with insert script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock], rowCount: 1
        });
        /**
         * Mock response created @EntityName@ with select script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock], rowCount: 1
        });

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).create@EntityName@(@entityName@Mock)
        expect(response).toBeInstanceOf(Object);
        expect(response._id).toEqual('6619738195230033669607f9');
    });

    it("should not create @EntityName@, error save function", async () => {
        const errorMock = new DefaultException('Error create the @EntityName@');
        client.query.mockImplementation(() => {
            throw errorMock;
        });

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        
        expect.assertions(2);
        @EntityName@Repository(client).create@EntityName@(@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toEqual('API-01-001');
        });
    });

    it("should get @EntityName@", async () => {

        /**
         * Mock response @entityName@ with select script ODM mongoose
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock], rowCount: 1
        });        
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        @entityName@Mock._id = '6619738195230033669607f9';
        const response = await @EntityName@Repository(client).get@EntityName@(@entityName@Mock);
        expect(response).toBeInstanceOf(Object);
        expect(response._id).toEqual('6619738195230033669607f9');
    });

    it("should not get @EntityName@, error select script", async () => {

        const errorMock = new DefaultException('');
        client.query.mockImplementation(() => {
            throw errorMock;
        });
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');

        expect.assertions(2);
        await @EntityName@Repository(null).get@EntityName@(@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toMatch(errorMock.code);
        });
    });

    it("should get @EntityName@ By Id & IdUser", async () => {

        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock], rowCount: 1
        }); 

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).get@EntityName@ById(@entityName@Mock._id, @entityName@Mock.user);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get @EntityName@ By Id & idUser, error select script", async () => {

        const errorMock = new DefaultException('');
        client.query.mockImplementation(() => {
            throw errorMock;
        });
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        expect.assertions(2);
        @EntityName@Repository(null).get@EntityName@ById(@entityName@Mock._id, @entityName@Mock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toMatch(errorMock.code);
        });
    });

    it("should get All @EntityName@", async () => {

        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock], rowCount: 1
        }); 

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).getAll@EntityName@(@entityName@Mock);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get All @EntityName@, error find", async () => {

        const errorMock = new DefaultException('');
        client.query.mockImplementation(() => {
            throw errorMock;
        });
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await @EntityName@Repository(null).getAll@EntityName@(@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toMatch(errorMock.code);
        });
    });

    it("should get @EntityName@ by Pager", async () => {
        /**
         * Mock response total @EntityName@ with select count script ORM Postgres
         */
        @entityName@Mock.total = 2;
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });
        /**
         * Mock response pager @EntityName@ with select script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {isFull: true, createdAt: @entityName@Mock.createdAt};

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).get@EntityName@Pager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 2);
    });

    it("should get @EntityName@ by Pager with Zero pageNumber index", async () => {
        /**
         * Mock response total @EntityName@ with select count script ORM Postgres
         */
        @entityName@Mock.total = 2;
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });
        /**
         * Mock response pager @EntityName@ with select script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });

        const pageSize = 1;
        const pageNumber = 0;
        const filter = {isFull: true, createdAt: @entityName@Mock.createdAt};

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).get@EntityName@Pager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 0);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get @EntityName@ by Pager without filter", async () => {

        /**
         * Mock response total @EntityName@ with select count script ORM Postgres
         */
        @entityName@Mock.total = 2;
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });
        /**
         * Mock response pager @EntityName@ with select script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });

        const pageSize = 1;
        const pageNumber = 1;

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).get@EntityName@Pager(pageSize, pageNumber, null);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 2);
    });

    it("should get @EntityName@ by Pager without params filter", async () => {

        /**
         * Mock response total @EntityName@ with select count script ORM Postgres
         */
        @entityName@Mock.total = 2;
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });
        /**
         * Mock response pager @EntityName@ with select script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock,@entityName@Mock], rowCount: 2
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {};

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).get@EntityName@Pager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 2);
    });

    it("should get @EntityName@ by Pager, error pagination", async () => {

        const errorMock = new DefaultException('');
        client.query.mockImplementation(() => {
            throw errorMock;
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {
        };

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        expect.assertions(2);
        @EntityName@Repository(null).get@EntityName@Pager(pageSize, pageNumber, filter).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toMatch(errorMock.code);
        });
    });

    it("should update @EntityName@", async () => {

        /**
         * Mock response updated @EntityName@ with update script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [], rowCount: 1
        });
        /**
         * Mock response @EntityName@ with select script ORM Postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [@entityName@Mock], rowCount: 1
        });


        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).update@EntityName@(@entityName@Mock._id,@entityName@Mock.user,@entityName@Mock)
        expect(response).toBeInstanceOf(Object);
    });

    it("should not update @EntityName@, error update query", async () => {

        const errorMock = new DefaultException('');
        client.query.mockImplementation(() => {
            throw errorMock;
        });

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        expect.assertions(2);
        @EntityName@Repository(client).update@EntityName@(@entityName@Mock._id,@entityName@Mock.user,@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toMatch(errorMock.code);
        });
    });

    it("should delete @EntityName@", async () => {

        client.query.mockResolvedValueOnce({
            rows: [], rowCount: 1
        });

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(client).delete@EntityName@(@entityName@Mock._id,@entityName@Mock.user)
        expect(response).toBeInstanceOf(Object);
        expect(response.rows).toStrictEqual([]);
    });

    it("should not delete @EntityName@, error delete query", async () => {

        const errorMock = new DefaultException('');
        client.query.mockImplementation(() => {
            throw errorMock;
        });

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        expect.assertions(2);
        @EntityName@Repository(null).delete@EntityName@(@entityName@Mock._id,@entityName@Mock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.code).toMatch(errorMock.code);
        });
    });

});