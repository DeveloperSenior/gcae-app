/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { GetObjectCommand } = require('@aws-sdk/client-s3');
const S3Service = require('../../../src/services/aws/S3Service');

const mockS3GetObject = jest.fn(({})=>{{Body:jest.fn()}});

//mock aws sdk
jest.mock('@aws-sdk/client-s3', () => {
    return {
        GetObjectCommand: jest.fn(),
        S3Client:jest.fn(()=>({
            send:mockS3GetObject
        }))
    };
});

describe("S3 Service", () => {

    beforeEach(() => {
        mockS3GetObject.mockReset();
    });

    afterEach(() => {

        jest.clearAllMocks();

    });

    it("should not signin user", async () => {

        const data = await S3Service().getObjectAsString('', '');

    });

});