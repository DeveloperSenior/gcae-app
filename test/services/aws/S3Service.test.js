/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const S3Service = require('../../../src/services/aws/S3Service');
const DefaultException = require('../../../src/models/exception/DefaultException');

// mock utilities
jest.mock('../../../src/utilities/Utilities');
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

describe("S3 Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
        const utilities = require('../../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => true);
    });

    it("should get Object As String", async () => {
        const utilities = require('../../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(()=> true);
        const data = await S3Service().getObjectAsString('', '');
        expect(data).toHaveProperty('fileName');
        expect(data).toHaveProperty('data');

    });

    it("should get Object As String with cache", async () => {
        const cache = require('../../../src/utilities/CacheUtil')
        const get = jest.spyOn(cache, 'get');
        get.mockImplementation(() => 'tengo cache');
        const data = await S3Service().getObjectAsString('', '');
        expect(data).toHaveProperty('fileName');
        expect(data).toHaveProperty('data');
        expect(data.data).toBe('tengo cache');

    });

    it("should get Object As String not debug", async () => {
        const utilities = require('../../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => false);
        const cache = require('../../../src/utilities/CacheUtil')
        const get = jest.spyOn(cache, 'get');
        get.mockImplementation(() => {});
        const data = await S3Service().getObjectAsString('', '');
        expect(data).toHaveProperty('fileName');
        expect(data).toHaveProperty('data');

    });

    it("should not get Object As String", async () => {
        try {
            const cache = require('../../../src/utilities/CacheUtil')
            const get = jest.spyOn(cache, 'get');
            get.mockImplementation(() => { throw 'Error mock' });
            await S3Service().getObjectAsString('', '');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
        }

    });

    it("should get Object As Byte Array", async () => {
        const data = await S3Service().getObjectAsByteArray('', '');
        expect(data).toHaveProperty('fileName');
        expect(data).toHaveProperty('data');

    });

    it("should get Object As Byte Array with cache", async () => {
        const cache = require('../../../src/utilities/CacheUtil')
        const get = jest.spyOn(cache, 'get');
        get.mockImplementation(() => 'tengo cache');
        const data = await S3Service().getObjectAsByteArray('', '');
        expect(data).toHaveProperty('fileName');
        expect(data).toHaveProperty('data');

    });

    it("should get Object As Byte Array not debug", async () => {
        const utilities = require('../../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => false);
        const cache = require('../../../src/utilities/CacheUtil')
        const get = jest.spyOn(cache, 'get');
        get.mockImplementation(() => {});
        const data = await S3Service().getObjectAsByteArray('', '');
        expect(data).toHaveProperty('fileName');
        expect(data).toHaveProperty('data');

    });

    it("should not get Object As Byte Array", async () => {
        try {
            const cache = require('../../../src/utilities/CacheUtil')
            const get = jest.spyOn(cache, 'get');
            get.mockImplementation(() => { throw 'Error mock' });
            await S3Service().getObjectAsByteArray('', '');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
        }

    });

    it("should put Object to Bucket", async () => {
        const data = await S3Service().putObject('', '', '');
        expect(data).toHaveProperty('status');
        expect(data.status).toBe(200);

    });

    it("should put Object to Bucket not debug", async () => {
        const utilities = require('../../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => false);
        const data = await S3Service().putObject('', '', '');
        expect(data).toHaveProperty('status');
        expect(data.status).toBe(200);

    });

    it("should not put Object to Bucket", async () => {
        try {
            const {
                S3Client,
            } = require("@aws-sdk/client-s3");
            S3Client.mockImplementation(() => { throw { message: 'Mock PUT error' } })
            await S3Service().putObject();
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toBe('Mock PUT error');
        }

    });

});