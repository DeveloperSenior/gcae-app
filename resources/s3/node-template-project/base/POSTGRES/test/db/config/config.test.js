/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Pool = require("pg").Pool;
const dbClient = require('../../../src/db/config/config');


jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(() => 'connected'),
        query: jest.fn(),
        release: jest.fn()
    };
    return { Pool: jest.fn(() => mPool) }
});

describe("DB Config", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("Should been create DB connection", async () => {
       const pool = await (await dbClient.connectDB()).connect();
       expect(pool).toBe('connected');
    });

});