/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('../services/IOFileService');
const { pipe } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const { getValueTest } =  require('../utilities/ValuesTest');


/**
 * Controller Generator Services
 * @returns 
 */
const ControllerGeneratorService = () => {

    const TEMPLATE = 'Controller';
    const FOLDER_TEMPLATE = 'src/controllers';
    const TEMPLATE_TEST = 'ControllerTest';
    const FOLDER_TEMPLATE_TEST = 'test/controllers';

    const generate = async (appfolder, entityModel, appConfig) => {

        const {
            name,
            description,
            fields
        } = entityModel;

        const ioFileServicesInject = pipe(() => { }, IOFileService)();
        /** Generate Controller */
        ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description);
                createFile(target, buffer);
            });

        let attrModelBuild = "";
        let attrsModelRequired = "";
        fields?.forEach(attr => {

            if(attr.required){
              attrsModelRequired = attrsModelRequired + `"must have required property '${toCamelCase(attr.name)}'",\n`;
            }
            attrModelBuild = attrModelBuild + `.with${toPascalCase(attr.name)}(${getValueTest(attr)})\n`;
        }
        );

        /** Generate Test Controller */
        ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST, `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description)
                    .replaceAll('@attrModelBuild@',attrModelBuild)
                    .replaceAll('@attrModelBuildRequired@',attrsModelRequired);

                createFile(target, buffer);
            });





    }

    return {
        generate
    }
}

module.exports = ControllerGeneratorService;