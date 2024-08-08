/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { pipe } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');


/**
 * Service Generator Services
 * @returns 
 */
const ValidatorGeneratorService = () => {

    const TEMPLATE = 'Validator';
    const TEMPLATE_SCHEMA = 'ValidatorSchema';
    const FOLDER_TEMPLATE = 'src/validators';
    const FOLDER_TEMPLATE_SCHEMA = 'src/models/schema';

    const generate = async (appfolder, entityModel, appConfig) => {

        const {
            name,
            description,
            fields
        } = entityModel;

        const ioFileServicesInject = pipe(() => { }, IOFileService)();

        const { data: schemaAttrsTemplate } = await ioFileServicesInject.getContentFileFromTemplate('ValidatorSchemaAttrs');
        const { data: schemaAttrsListTemplate } = await ioFileServicesInject.getContentFileFromTemplate('ValidatorSchemaAttrsList');
        const { data: schemaAttrsNormalTemplate } = await ioFileServicesInject.getContentFileFromTemplate('ValidatorSchemaAttrsNormal');

        let attrsModelProperties = "";
        let attrsModelRequired = "";
        let index = 1;
        fields?.forEach(attr => {

            const { name, type, items, pk, required, nullable } = attr;
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
                    .replaceAll('@quoted@',quoted);

            } else {

                attrsModelProperties = attrsModelProperties + schemaAttrsNormalTemplate.replaceAll('@attrName@', toCamelCase(name))
                    .replaceAll('@attrType@', toCamelCase(type))
                    .replaceAll('@attrNullable@', (nullable || required) || true)
                    .replaceAll('@quoted@',quoted);
            }

            if (pk | required) {
                attrsModelRequired = attrsModelRequired + `"${toCamelCase(name)}"${quoted}\n`;
            }

            ++index

        }
        );

        /** Generate Schema */
        ioFileServicesInject.generateFileFromTemplate(TEMPLATE_SCHEMA, `${appfolder}/${FOLDER_TEMPLATE_SCHEMA}/${toPascalCase(name)}Schema.json`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@attrsProperties@', attrsModelProperties)
                    .replaceAll('@attrsRequired@', attrsModelRequired);
                createFile(target, buffer);
            });

        /** Generate Validator */
        ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description);
                createFile(target, buffer);
            });



    }

    return {
        generate
    }
}

module.exports = ValidatorGeneratorService;