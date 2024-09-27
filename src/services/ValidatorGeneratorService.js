/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { inject } = require('../utilities/Utilities');
const { NUMBERS_TYPES, STRING_TYPES } = require('../utilities/Constants');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const { getValueTest } = require('../utilities/ValuesTest');


/**
 * Service Generator Services
 * @returns 
 */
const ValidatorGeneratorService = () => {

    const TEMPLATE = 'Validator';
    const TEMPLATE_SCHEMA = 'ValidatorSchema';
    const FOLDER_TEMPLATE = 'src/validators';
    const FOLDER_TEMPLATE_SCHEMA = 'src/models/schemas';
    const TEMPLATE_TEST = 'ValidatorTest';
    const FOLDER_TEMPLATE_TEST = 'test/validators';

    /**
     * generate Schema
     * @param {*} entityModel 
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateSchema = async (entityModel, target, data, createFile, attrsModelProperties, attrsModelRequired) => {
        const {
            name
        } = entityModel;
        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@attrsProperties@', attrsModelProperties)
            .replaceAll('@attrsRequired@', attrsModelRequired);
        createFile(target, buffer);
    }

    /**
     * replace Data
     * @param {*} entityModel 
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const replaceData = async (entityModel, target, data, createFile) => {
        const {
            name,
            description
        } = entityModel;
        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description);

        createFile(target, buffer);
    }

    /**
     * generate module
     * @param {*} appfolder 
     * @param {*} entityModel 
     * @param {*} appConfig 
     */
    const generate = async (appfolder, entityModel, appConfig) => {

        const {
            name,
            fields
        } = entityModel;

        const ioFileServicesInject = inject(() => { }, IOFileService)();

        const { data: schemaAttrsTemplate } = await ioFileServicesInject.getContentFileFromTemplate('ValidatorSchemaAttrs');
        const { data: schemaAttrsListTemplate } = await ioFileServicesInject.getContentFileFromTemplate('ValidatorSchemaAttrsList');
        const { data: schemaAttrsNormalTemplate } = await ioFileServicesInject.getContentFileFromTemplate('ValidatorSchemaAttrsNormal');

        let attrsModelProperties = "";
        let attrsModelRequired = "";
        let index = 1;
        fields?.forEach(attr => {

            const { name, type, items, required, nullable } = attr;
            let quoted = "";

            if (index < fields.length) {
                quoted = ",";
            }

            if ('Array' === toPascalCase(type)) {

                const { type: itemtype, nullable, itemNullable } = items;

                const attrsItemsAdd = schemaAttrsTemplate.replaceAll('@attrType@', toCamelCase(itemtype))
                    .replaceAll('@attrNullable@', itemNullable || true);

                attrsModelProperties = attrsModelProperties + schemaAttrsListTemplate.replaceAll('@attrName@', toCamelCase(name))
                    .replaceAll('@attrAdd@', attrsItemsAdd)
                    .replaceAll('@attrNullable@', (nullable || required) || true)
                    .replaceAll('@quoted@', quoted);

            } else if (NUMBERS_TYPES.includes(toPascalCase(type))) {

                attrsModelProperties = attrsModelProperties + schemaAttrsNormalTemplate.replaceAll('@attrName@', toCamelCase(name))
                    .replaceAll('@attrType@', toCamelCase('Number'))
                    .replaceAll('@attrNullable@', (nullable || required) || true)
                    .replaceAll('@quoted@', quoted);

            } else if (STRING_TYPES.includes(toPascalCase(type))) {

                attrsModelProperties = attrsModelProperties + schemaAttrsNormalTemplate.replaceAll('@attrName@', toCamelCase(name))
                    .replaceAll('@attrType@', toCamelCase('String'))
                    .replaceAll('@attrNullable@', (nullable || required) || true)
                    .replaceAll('@quoted@', quoted);

            } else {

                attrsModelProperties = attrsModelProperties + schemaAttrsNormalTemplate.replaceAll('@attrName@', toCamelCase(name))
                    .replaceAll('@attrType@', toCamelCase(type))
                    .replaceAll('@attrNullable@', (nullable || required) || true)
                    .replaceAll('@quoted@', quoted);

            }

            ++index

        }
        );

        index = 1;
        const fieldsRequired = fields?.filter(attr => attr.pk || attr.required);
        fieldsRequired?.forEach(attr => {

            const { name } = attr;
            let quoted = "";

            if (index < fieldsRequired.length) {
                quoted = ",";
            }

            attrsModelRequired = attrsModelRequired + `"${toCamelCase(name)}"${quoted}\n`;

            ++index

        }
        );

        /** Generate Schema */
        const { target: targetSchema, data: dataSchema, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE_SCHEMA, `${appfolder}/${FOLDER_TEMPLATE_SCHEMA}/${toPascalCase(name)}Schema.json`);
        generateSchema(entityModel, targetSchema, dataSchema, createFile, attrsModelProperties, attrsModelRequired);

        /** Generate Validator */
        const { target, data } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`);
        replaceData(entityModel, target, data, createFile);

        /** Generate Test Service */
        const { target: targetTest, data: dataTest } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST, `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`);
        replaceData(entityModel, targetTest, dataTest, createFile);

    }

    return {
        generate
    }
}

module.exports = ValidatorGeneratorService;