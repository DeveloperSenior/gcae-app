/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { pipe } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const { getValueTest } =  require('../utilities/ValuesTest');



/**
 * Repository Generator Services
 * @returns 
 */
const RepositoryGeneratorService = () => {

    const TEMPLATE = 'Repository';
    const FOLDER_TEMPLATE = 'src/db';
    const TEMPLATE_TEST = 'RepositoryTest';
    const FOLDER_TEMPLATE_TEST = 'test/db';

    const generate = async (appfolder, entityModel, appConfig) => {

        const {
            name,
            description,
            fields
        } = entityModel;

        const ioFileServicesInject = pipe(() => { }, IOFileService)();

        ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description);
                createFile(target, buffer);
            });

            let attrModelBuildValue = "";
            fields?.forEach(attr => {
    
               attrModelBuildValue = attrModelBuildValue + `.with${toPascalCase(attr.name)}(${getValueTest(attr)})\n`;
    
            }
            );

        /** Generate Test Service */
        ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST, `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description)
                    .replaceAll('@attrModelBuild@', attrModelBuildValue);

                createFile(target, buffer);
            });

    }

    return {
        generate
    }
}

module.exports = RepositoryGeneratorService;