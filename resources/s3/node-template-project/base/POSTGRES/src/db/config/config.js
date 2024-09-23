/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const Pool = require("pg").Pool;
const { decodeBase64 } = require('../../utilities/Base64Util');

/**
 * connectDB function pen connection to Postgres DB cloud database discover-app
 * @returns instance object PG pool.connection
 */

const connectDB = async () => {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const dbName = process.env.DB_NAME;
    const dbToken = process.env.DB_TOKEN;
    const port = process.env.DB_PORT;

    const dbConnection = new Pool({
        user: user,
        host: host,
        database: dbName,
        password: decodeBase64(dbToken),
        port: port,
        max: 1,
        min: 0,
        idleTimeoutMillis: 120000,
        connectionTimeoutMillis: 10000
      });

    return dbConnection;
}

module.exports = { connectDB }