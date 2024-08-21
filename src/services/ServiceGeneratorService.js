/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { pipe } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const { getValueTest } = require('../utilities/ValuesTest');


/**
 * Service Generator Services
 * @returns 
 */
const ServiceGeneratorService = () => {

    const TEMPLATE = 'Service';
    const FOLDER_TEMPLATE = 'src/services';
    const TEMPLATE_TEST = 'ServiceTest';
    const FOLDER_TEMPLATE_TEST = 'test/services';

    /**
     * generate Service
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateService = async (entityModel,target, data, createFile, attrsModel, attrModelBuild) => {

        const {
            name,
            description,
        } = entityModel;

        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description)
            .replaceAll('@attrsModel@', attrsModel)
            .replaceAll('@attrModelBuild@', attrModelBuild);
        createFile(target, buffer);
    }

    /**
     * generate Test
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateTest = async (entityModel,target, data, createFile,attrModelBuildValue) => {
        const {
            name,
            description,
        } = entityModel;
        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description)
            .replaceAll('@attrModelBuild@', attrModelBuildValue);

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

        /** Generate Service */
        const { target, data, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`);
        generateService(entityModel,target, data, createFile, attrsModel, attrModelBuild);

        /** Generate Test Service */
        const { target: targetTest, data: dataTest } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST, `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`);
        generateTest(entityModel, targetTest, dataTest, createFile, attrModelBuildValue);
    }

    return {
        generate
    }
}

module.exports = ServiceGeneratorService;