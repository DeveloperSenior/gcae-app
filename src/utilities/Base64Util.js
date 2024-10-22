/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

/**
 * decode
 * @param {*} value 
 * @param {*} code 
 * @returns 
 */
const decode = (value, code = 'utf-8') => {
    return Buffer.from(value, 'base64').toString(code);
}

/**
 * encodeBase64
 * @param {*} value 
 * @returns 
 */
const encodeBase64 = (value) => {
    return Buffer.from(value).toString('base64');
}

/**
 * decodeBase64toAscii
 * @param {*} value 
 * @returns 
 */
const decodeBase64toAscii = (value) => {
    return decode(value, 'ascii');
}

/**
 * decodeBase64
 * @param {*} value 
 * @returns 
 */
const decodeBase64 = (value) => {
    return decode(value);
}



module.exports = { encodeBase64, decodeBase64toAscii, decodeBase64 }