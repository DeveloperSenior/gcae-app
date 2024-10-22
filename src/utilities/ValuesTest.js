const { toCamelCase, toPascalCase } = require('js-convert-case');
const { NUMBERS_TYPES } = require('./Constants');

/**
 * Generate data unit test Model used to generator
 * @param {*} attrField 
 * @returns 
 */
const getValueTest = (attrField) => {

    const {
        name,
        type,
        items,
        required
    } = attrField;

    let value = '';

    switch (toPascalCase(type)) {
        case 'Array':
            if ('String' === toPascalCase(items.type)) {
                value = `['${toCamelCase(name)}Test1','${toCamelCase(name)}Test2','${toCamelCase(name)}Test3']`
            } else {
                value = '[{}]'
            }
            break;
        case 'String':
            value = `'${toCamelCase(name)}Test'`
            break;
        default:
            if(NUMBERS_TYPES.includes(toPascalCase(type))){
                value = `${ Math.floor(Math.random() * 9999)}`
            }else{
              value = `'${toCamelCase(name)}Test'`
            }
            break;
    }
    return value;
}

module.exports = { getValueTest }