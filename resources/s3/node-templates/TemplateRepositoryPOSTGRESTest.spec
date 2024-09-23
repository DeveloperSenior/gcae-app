/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { @EntityName@Model } = require('../../src/models/@EntityName@Model');
const mockingoose = require('mockingoose');
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

const @entityName@PagerMock =
    {
        "actualPage": 1,
        "totalPage": 1,
        "prevPage": null,
        "nextPage": 1,
        "data": [
            @entityName@Mock
        ]
    }
;

describe("@EntityName@ Repository DB", () => {

    afterEach(() => {
        @entityName@Mock.state = STATES.INITIAL;
        jest.clearAllMocks();

    });

    it("should create @EntityName@", async () => {

        /**
         * Mock response created @EntityName@ with save function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'save');
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'findOne');

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).create@EntityName@(@entityName@Mock)
        expect(response).toBeInstanceOf(Object);
    });

    it("should not create @EntityName@, error save function", async () => {

        /**
         * Mock response created @entityName@ with save function ODM mongoose
         * true isn't monogo document return save function
         */
        mockingoose(@EntityName@Model).toReturn(true, 'save');

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        await @EntityName@Repository(@EntityName@Model).create@EntityName@(@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get @EntityName@", async () => {

        /**
         * Mock response update @entityName@ with updateOne function ODM mongoose
         */
        @entityName@Mock.updatedAt = @entityName@Mock.createdAt;
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'updateOne');
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'findOne');
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        @entityName@Mock._id = '6619738195230033669607f9';
        const response = await @EntityName@Repository(@EntityName@Model).get@EntityName@(@entityName@Mock);
        expect(response).toBeInstanceOf(Object);
    });

    it("should not get @EntityName@, error updateOne", async () => {

        /**
         * Mock response update @entityName@ with updateOne function ODM mongoose
         */

        mockingoose(@EntityName@Model).toReturn(true, 'updateOne');
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await @EntityName@Repository(null).get@EntityName@(@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get @EntityName@ By Id & IdUser", async () => {

        /**
         * Mock response retrieve @entityName@ with find function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'findOne');
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).get@EntityName@ById(@entityName@Mock._id, @entityName@Mock.user);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get @EntityName@ By Id & idUser, error findOne", async () => {

        /**
         * Mock response retrieve @entityName@ with findOne function ODM mongoose
         */

        mockingoose(@EntityName@Model).toReturn(true, 'findOne');
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await @EntityName@Repository(null).get@EntityName@ById(@entityName@Mock._id, @entityName@Mock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get All @EntityName@", async () => {

        /**
         * Mock response getAll @entityName@ with find function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn([@entityName@Mock], 'find');
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).getAll@EntityName@(@entityName@Mock);
        expect(response).toBeInstanceOf(Object);
    });

    it("should get All @EntityName@, error find", async () => {

        /**
         * Mock response retrieve @entityName@ with findOne function ODM mongoose
         */

        mockingoose(@EntityName@Model).toReturn(true, 'find');
        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await @EntityName@Repository(null).getAll@EntityName@(@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should get @EntityName@ by Pager", async () => {

        /**
         * Mock response retrieve @entityName@ with find function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@PagerMock, 'paginate');

        const paginate = jest.spyOn(@EntityName@Model, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[@entityName@Mock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {isFull: true, createdAt: @entityName@Mock.createdAt};

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).get@EntityName@Pager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get @EntityName@ by Pager without filter", async () => {

        /**
         * Mock response retrieve @entityName@ with find function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@PagerMock, 'paginate');

        const paginate = jest.spyOn(@EntityName@Model, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[@entityName@Mock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).get@EntityName@Pager(pageSize, pageNumber, null);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get @EntityName@ by Pager without params filter", async () => {

        /**
         * Mock response retrieve @entityName@ with find function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@PagerMock, 'paginate');

        const paginate = jest.spyOn(@EntityName@Model, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[@entityName@Mock],
                "actualPage": 1,
                "totalPage": 1,
                "prevPage": null,
                "nextPage": 1,
            }
        });

        const pageSize = 1;
        const pageNumber = 1;
        const filter = {};

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).get@EntityName@Pager(pageSize, pageNumber, filter);
        expect(response).toBeInstanceOf(Object);
        expect(response).toHaveProperty('actualPage', 1);
        expect(response).toHaveProperty('nextPage', 1);
    });

    it("should get @EntityName@ by Pager, error pagination", async () => {

        /**
         * Mock response retrieve @entityName@ with find function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@PagerMock, 'paginate');

        const paginate = jest.spyOn(@EntityName@Model, 'paginate');
        paginate.mockImplementation(() => {
            return {
                "docs":[@entityName@Mock],
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

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        /**
         * Null model param to exception ODM
         */
        await @EntityName@Repository(null).get@EntityName@Pager(pageSize, pageNumber, filter).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should update @EntityName@", async () => {

        /**
         * Mock response update @entityName@ with findOneAndUpdate function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'findOneAndUpdate');
        mockingoose(@EntityName@Model).toReturn(@entityName@Mock, 'findOne');

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).update@EntityName@(@entityName@Mock._id,@entityName@Mock.user,@entityName@Mock)
        expect(response).toBeInstanceOf(Object);
    });

    it("should not update @EntityName@, error findOneAndUpdate function", async () => {

        /**
         * Mock response created @entityName@ with save function ODM mongoose
         * true isn't monogo document return save function
         */
        mockingoose(@EntityName@Model).toReturn(true, 'findOneAndUpdate');

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        await @EntityName@Repository(@EntityName@Model).update@EntityName@(@entityName@Mock._id,@entityName@Mock.user,@entityName@Mock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

    it("should delete @EntityName@", async () => {

        /**
         * Mock response delete @EntityName@ with deleteOne function ODM mongoose
         */
        mockingoose(@EntityName@Model).toReturn(null, 'deleteOne');

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const response = await @EntityName@Repository(@EntityName@Model).delete@EntityName@(@entityName@Mock._id,@entityName@Mock.user)
        expect(response).toBeNull();
    });

    it("should not delete @EntityName@, error deleteOne function", async () => {

        /**
         * Mock response deleted @EntityName@ with save function ODM mongoose
         * true isn't monogo document return save function
         */
        mockingoose(@EntityName@Model).toReturn(true, 'deleteOne');

        const @EntityName@Repository = require('../../src/db/@EntityName@Repository');
        const errorMock = new DefaultException('');
        expect.assertions(2);
        await @EntityName@Repository(null).delete@EntityName@(@entityName@Mock._id,@entityName@Mock.user).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });
    });

});