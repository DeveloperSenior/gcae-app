/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('../services/IOFileService');
const { inject } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase, toUpperCase } = require('js-convert-case');
const { getValueTest } = require('../utilities/ValuesTest');


/**
 * Controller Generator Services
 * @returns 
 */
const ControllerGeneratorService = () => {

    const TEMPLATE = 'Controller';
    const FOLDER_TEMPLATE = 'src/controllers';
    const TEMPLATE_TEST = 'Controller{dataBaseType}Test';
    const FOLDER_TEMPLATE_TEST = 'test/controllers';

    /**
     * generate Controller
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateController = async (entityModel, target, data, createFile) => {
        const {
            name,
            description,
        } = entityModel;
        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description);
        createFile(target, buffer);
    }

    /**
     * generate Test
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateTest = async (entityModel, target, data, createFile, attrModelBuild, attrsModelRequired) => {
        const {
            name,
            description,
        } = entityModel;
        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description)
            .replaceAll('@attrModelBuild@', attrModelBuild)
            .replaceAll('@attrModelBuildRequired@', attrsModelRequired);

        createFile(target, buffer);
    }

    /**
     * generate module
     * @param {*} appfolder 
     * @param {*} entityModel 
     * @param {*} appConfig 
     */
    const generate = async (appfolder, entityModel, appConfig) => {

        const { type: dataBaseType } = appConfig.dataBase;

        const {
            name,
            fields
        } = entityModel;

        const ioFileServicesInject = inject(() => { }, IOFileService)();
        /** Generate Controller */
        const { target, data, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE+ toUpperCase(dataBaseType), `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`);
        generateController(entityModel, target,data, createFile);

        let attrModelBuild = "";
        let attrsModelRequired = "";
        fields?.forEach(attr => {

            if (attr.required) {
                attrsModelRequired = attrsModelRequired + `"must have required property '${toCamelCase(attr.name)}'",\n`;
            }
            attrModelBuild = attrModelBuild + `.with${toPascalCase(attr.name)}(${getValueTest(attr)})\n`;
        }
        );

        /** Generate Test Controller */
        const { target: targetTest, data: dataTest } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST.replaceAll('{dataBaseType}', toUpperCase(dataBaseType)), `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`);
        generateTest(entityModel, targetTest,dataTest,createFile, attrModelBuild, attrsModelRequired);
    }

    return {
        generate
    }
}

module.exports = ControllerGeneratorService;