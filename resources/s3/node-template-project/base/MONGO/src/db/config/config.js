/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const mongoose = require('mongoose');
const { decodeBase64 } = require('../../utilities/Base64Util');

/**
 * connectDB function pen connection to mongoDB cloud database discover-app
 * @returns instance object mongoose.connection
 */

const connectDB = async () => {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const dbName = process.env.DB_NAME;
    const dbToken = process.env.DB_TOKEN;
    const protocol = process.env.DB_PROTOCOL;
    const port = process.env.DB_PORT ? `:${process.env.DB_PORT}` : '';
    const url = `${protocol}://${user}:${decodeBase64(dbToken)}@${host}${port}/${dbName}`;
    await mongoose.connect(url);

    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
        console.log(`Database connected: ${url}`);
    });

    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });

    return dbConnection
}

module.exports = { connectDB }