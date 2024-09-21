/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const jwt = require('jsonwebtoken');
const { HTTP_CODE, HEADERS, ERROR_CODE, ERROR_MESSAGE, ERROR_TYPE } = require('../utilities/Constants');
const { decodeBase64 } = require('../utilities/Base64Util');
const DefaultException = require('../../src/models/exception/DefaultException');

/**
 * verify Token Session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyTokenSession = (req, res, next) => {
    const token = req.header(HEADERS.AUTHORIZATION);
    let exception = new DefaultException('Access denied');
    exception.code = ERROR_CODE.ACCESS;
    exception.type = ERROR_TYPE.ACCESS;
    exception.message = ERROR_MESSAGE.ACCESS;
    if (!token) return res.status(HTTP_CODE.UNAUTHORIZED).json(exception);
    try {
        const arrayToken = token.split(" ");
        const decoded = jwt.verify(arrayToken[1], decodeBase64(process.env.JWT_SECRET_KEY));
        req.email = decoded.email;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        exception.exception = `Invalid token: ${error.message}`;
        return res.status(HTTP_CODE.UNAUTHORIZED).json(exception);
    }
};

module.exports = verifyTokenSession;