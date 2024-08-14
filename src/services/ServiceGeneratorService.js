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
 * Service Generator Services
 * @returns 
 */
const ServiceGeneratorService = () => {

    const TEMPLATE = 'Service';
    const FOLDER_TEMPLATE = 'src/services';
    const TEMPLATE_TEST = 'ServiceTest';
    const FOLDER_TEMPLATE_TEST = 'test/services';    

    const generate = async (appfolder, entityModel, appConfig) => {

        const {
            name,
            description,
            fields
        } = entityModel;

        const ioFileServicesInject = pipe(() => { }, IOFileService)();

        let attrModelBuild = "";
        let attrModelBuildValue = "";
        let attrsModel = "";
        fields?.forEach(attr => {

            attrsModel = attrsModel + `${toCamelCase(attr.name)},\n`;
            attrModelBuild = attrModelBuild + `.with${toPascalCase(attr.name)}(${toCamelCase(attr.name)})\n`;
            attrModelBuildValue = attrModelBuildValue + `.with${toPascalCase(attr.name)}(${getValueTest(attr)})\n`;

        }
        );

        ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description)
                    .replaceAll('@attrsModel@',attrsModel)
                    .replaceAll('@attrModelBuild@',attrModelBuild);
                createFile(target, buffer);
            });
    
            /** Generate Test Service */
            ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST, `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`,
                (target, data, createFile) => {
    
                    const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                        .replaceAll('@entityName@', toCamelCase(name))
                        .replaceAll('@Description@', description)
                        .replaceAll('@attrModelBuild@',attrModelBuildValue);
    
                    createFile(target, buffer);
                });

    }

    return {
        generate
    }
}

module.exports = ServiceGeneratorService;