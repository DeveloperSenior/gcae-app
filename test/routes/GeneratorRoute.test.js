
const mockingoose = require('mockingoose');
const request = require("supertest");
const app = require("../../app");
const { AppModel } = require('../../src/models/AppModel');
const { UserModel } = require('../../src/models/UserModel');
const DefaultException = require('../../src/models/exception/DefaultException');
const { HTTP_CODE } = require('../../src/utilities/Constants');
const bcrypt = require('bcrypt');
const { App } = require('../../src/models/dto/App');
const { User } = require('../../src/models/dto/User');
const jwt = require('jsonwebtoken');

/** Mock middleware by default next true */
jest.mock('../../src/middleware/AuthMiddleware', () => jest.fn((_, __, next) => next()));

beforeAll(() => {

    /** Mock express server */
    const app = {
        use: jest.fn(),
        listen: jest.fn(),
        address: jest.fn()
    }
    jest.doMock('express', () => {
        return () => {
            return app
        }
    });

});
/**
 * Mock user mongo document 
 */
const userMock =
    {
        _id: "6615b9d07547e0fc5387077c",
        userName: "testUser",
        bio: "Developer",
        avatar: "http://avatar/andres.png",
        email: "testUser@gmail.com",
        password: "JDJiJDEwJDVFTWVnQ0NvR0NKRGd0d2QvamVUc2UwUVkvak13VVEwRE9Wa1U4MXdzQ203Z0ZYZmhkMW11",
        createdAt: "2024-04-09T00:00:00.000Z",
        followers: [],
        followings:[]
    }
;

/**
 * Define test suite PUT /api/v1/user
 */
describe("PUT /api/v1/generateApp", () => {
    beforeEach(() => jest.clearAllMocks());
    it("should return estatus code HTTP 201 CREATED", async () => {
        /**
         * Mock request paylod body User to create
         */
        const signinMock = new User.Builder()
            .withEmail('testUser@gmail.com').withPassword('admin123')
            .withUserName('testUser').withBio('Developer').withAvatar('http://avatar/test.png').build();

        /**
        * Mock response user with findOne to login function ODM mongoose
        */
        mockingoose(UserModel).toReturn(userMock, 'findOne');
        /** Mock express app request*/
        return request(app)
            .put("/api/v1/generateApp")
            .send(signinMock)
            .set("Accept", "application/json")
            .expect('Content-Type', /json/)
            .expect(HTTP_CODE.CREATED)
            .then((res) => {
                expect(res.statusCode).toBe(HTTP_CODE.CREATED);
            });
    });
    
});