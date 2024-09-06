/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { inject } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const { getValueTest } = require('../utilities/ValuesTest');



/**
 * Repository Generator Services
 * @returns 
 */
const RepositoryGeneratorService = () => {

    const TEMPLATE = 'Repository';
    const FOLDER_TEMPLATE = 'src/db';
    const TEMPLATE_TEST = 'RepositoryTest';
    const FOLDER_TEMPLATE_TEST = 'test/db';

    /**
     * generate Repository
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateRepository = async (entityModel, target, data, createFile) => {
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
     * generate Test
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateTest = async (entityModel, target, data, createFile, attrModelBuildValue) => {
        const {
            name,
            description
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

        const ioFileServicesInject = inject(() => { }, IOFileService)();

        /** Generate repository */
        const { target, data, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`);
        generateRepository(entityModel, target, data, createFile);

        let attrModelBuildValue = "";
        fields?.forEach(attr => {

            attrModelBuildValue = attrModelBuildValue + `.with${toPascalCase(attr.name)}(${getValueTest(attr)})\n`;

        }
        );

        /** Generate Test repository */
        const { target: targetTest, data: dataTest } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST, `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`);
        generateTest(entityModel, targetTest, dataTest, createFile,attrModelBuildValue);
    }

    return {
        generate
    }
}

module.exports = RepositoryGeneratorService;