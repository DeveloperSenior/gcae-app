/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { @EntityName@ } = require('../../src/models/dto/@EntityName@');
const DefaultException = require('../../src/models/exception/DefaultException');
const { ERROR_MESSAGE, ERROR_CODE, ERROR_TYPE } = require('../../src/utilities/Constants');
const { inject } = require('../../src/utilities/Utilities');

const userSessionMock = { email: 'test@test.com', userId: '123123' };
const @entityName@Mock = new @EntityName@.Builder()
    .withId('123123')
    @attrModelBuild@
    .withCreatedAt('2024-08-09')
    .withUpdatedAt('2024-08-09')
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
describe("@EntityName@ Service", () => {

    beforeEach(() => {
        jest.mock('../../src/db/@EntityName@Repository');
        const repository = require('../../src/db/@EntityName@Repository');
        repository.mockImplementation(() => {
            return {
                create@EntityName@: jest.fn(async (@entityName@) => @entityName@Mock),
                get@EntityName@: jest.fn(async (@entityName@) => @entityName@Mock),
                getAll@EntityName@: jest.fn(async (@entityName@) => [@entityName@Mock]),
                get@EntityName@ById: jest.fn(async (_id, userId) => @entityName@Mock),
                get@EntityName@Pager: jest.fn(async (pageSize, pageNumber, filter) => @entityName@PagerMock),
                update@EntityName@: jest.fn(async (_id, userId, @entityName@) => @entityName@Mock),
                delete@EntityName@: jest.fn(async (_id, userId) => { })
            }
        });
    });
    afterEach(() => {

        jest.restoreAllMocks();
        jest.clearAllMocks();

    });

    it('should create @EntityName@', async () => {
        const repository = require('../../src/db/@EntityName@Repository');
        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        const response = await inject@EntityName@Service.create@EntityName@(@entityName@Mock, userSessionMock);
        expect(response).toEqual(@entityName@Mock);

    });

    it('should get @EntityName@', async () => {
        const repository = require('../../src/db/@EntityName@Repository');
        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        const response = await inject@EntityName@Service.get@EntityName@(@entityName@Mock, userSessionMock);
        expect(response).toEqual(@entityName@Mock);
        expect(response.createdAt).toEqual('2024-08-09');

    });

    it('should get All @EntityName@', async () => {
        const repository = require('../../src/db/@EntityName@Repository');
        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        const response = await inject@EntityName@Service.getAll@EntityName@(userSessionMock);
        expect(response).toBeInstanceOf(Array);
        expect(response).toHaveLength(1);
        expect(response).toEqual([@entityName@Mock]);

    });

    it('should get @EntityName@ Pager', async () => {

        const pageSize = 1;
        const pageNumber = 1;
        const filters = new @EntityName@.Builder().build();
        const repository = require('../../src/db/@EntityName@Repository');
        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        const response = await inject@EntityName@Service.get@EntityName@Pager(pageSize, pageNumber, filters);
        expect(response).toBeInstanceOf(Array);
        expect(response).toHaveLength(1);
        expect(response[0]).toHaveProperty('totalPage', 1);
        expect(response[0]).toHaveProperty('data');

    });

    it('should update @EntityName@', async () => {

        const repository = require('../../src/db/@EntityName@Repository');
        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        const response = await inject@EntityName@Service.update@EntityName@(@entityName@Mock._id, @entityName@Mock, userSessionMock)
        expect(response).toEqual(@entityName@Mock);
        expect(response._id).toEqual(@entityName@Mock._id);
        expect(response.updatedAt).toEqual('2024-08-09');

    });

    it("should not update @EntityName@, '_id' @EntityName@ no exists by Id", async () => {

        const repository = require('../../src/db/@EntityName@Repository');
        repository.mockImplementation(() => {
            return {
                get@EntityName@ById: jest.fn(async (_id, userId) => {})
            }
        });

        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const errorMock = new DefaultException(ERROR_MESSAGE.ENTITY_ISNT_SESSION);
        errorMock.code = ERROR_CODE.VALIDATE;
        errorMock.type = ERROR_TYPE.VALIDATE;
        expect.assertions(2);
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        await inject@EntityName@Service.update@EntityName@(@entityName@Mock._id, @entityName@Mock, userSessionMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });

    });

    it('should delete @EntityName@', async () => {

        const repository = require('../../src/db/@EntityName@Repository');
        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        const response = await inject@EntityName@Service.delete@EntityName@(@entityName@Mock._id, userSessionMock)
        expect(response).toBeUndefined();

    });

    it("should not delete @EntityName@, '_id' @EntityName@ no exists by Id", async () => {

        const repository = require('../../src/db/@EntityName@Repository');
        repository.mockImplementation(() => {
            return {
                get@EntityName@ById: jest.fn(async (_id, userId) => {})
            }
        });

        const @EntityName@Service = require('../../src/services/@EntityName@Service');
        const errorMock = new DefaultException(ERROR_MESSAGE.ENTITY_ISNT_SESSION);
        errorMock.code = ERROR_CODE.VALIDATE;
        errorMock.type = ERROR_TYPE.VALIDATE;
        expect.assertions(2);
        const inject@EntityName@Service = inject(repository, @EntityName@Service)();
        await inject@EntityName@Service.delete@EntityName@(@entityName@Mock._id, @entityName@Mock, userSessionMock).catch(error => {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch(errorMock.exception);
        });

    });


});