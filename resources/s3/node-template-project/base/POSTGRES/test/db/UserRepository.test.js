/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Pool = require("pg").Pool;
const { User } = require('../../src/models/dto/User');
const DefaultException = require('../../src/models/exception/DefaultException');
const moment = require('moment');
const { DATE_FORMAT } = require('../../src/utilities/Constants');

/**
 * Mock user postges model 
 */
const userMock =     {
    _id: "1",
    userName: "testUser",
    bio: "Developer",
    avatar: "http://avatar/test.png",
    email: "testUser@gmail.com",
    password: "JDJiJDEwJDVFTWVnQ0NvR0NKRGd0d2QvamVUc2UwUVkvak13VVEwRE9Wa1U4MXdzQ203Z0ZYZmhkMW11",
    createdAt: "2024-08-09"
};

jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(),
        query: jest.fn(),
        release: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
});

describe("User Repository DB", () => {
    let client;

    beforeEach(() => {
        client = new Pool()
    });

    afterEach(() => {

        jest.clearAllMocks();

    });

    it("should not create the user", async () => {

        client.query.mockImplementation(() => {
            throw new Error('Error create the user');
        });

        /**
         * Mock param User to create
         */
        const signinMock = new User.Builder()
            .withEmail('testUser@gmail.com').withPassword('admin123')
            .withUserName('testUser').withBio('Developer').withAvatar('http://avatar/andres.png').build();
        const UserRepository = require('../../src/db/UserRepository');

        try {
            await UserRepository(client).signin(signinMock);
          } catch (error) {
            expect(error.code).toEqual('API-01-001');
          }
    });

    it("should create the user", async () => {

        client.query.mockResolvedValueOnce({
            rows: [true], rowCount: 1
        });

        /**
         * Mock param User to create
         */
        const currentDate = moment().format(DATE_FORMAT.DEFAULT);
        const signinMock = new User.Builder()
            .withEmail('testUser@gmail.com').withPassword('admin123')
            .withUserName('testUser').withCreatedAt(currentDate).withBio('Developer').withAvatar('http://avatar/andres.png').build();
        const UserRepository = require('../../src/db/UserRepository');
        const isCreate = await UserRepository(client).signin(signinMock);
        expect(isCreate).toBe(true);

    });

    it("should not exist email and throw login exception", async () => {
        /**
         * Mock response all user list with find function ORM postgres
         */
        const errorMessage = 'Error Retrieve user email';
        client.query.mockImplementation(() => {throw new Error(errorMessage)});
        const UserRepository = require('../../src/db/UserRepository');
        const emailMock = 'mock@mock.com';
        expect.assertions(2);
        await UserRepository(client).login(emailMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMessage);
        });

    });

    it("should not exist email", async () => {
        /**
         * Mock response all user list with find function ORM postgres
         */
        client.query.mockResolvedValueOnce({
            rows: [], rowCount: 0
        });

        const UserRepository = require('../../src/db/UserRepository');
        const emailMock = 'mock@mock.com';
        const result = await UserRepository(client).login(emailMock);
        expect(result).toBe(undefined);
    });

});
