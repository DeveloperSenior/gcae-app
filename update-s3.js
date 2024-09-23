/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { inject } = require('./src/utilities/Utilities');
const { HTTP_CODE } = require('./src/utilities/Constants');
const { toCamelCase, toPascalCase } = require('js-convert-case');

const IOFileService = require('./src/services/IOFileService');

const idInterval = setInterval(() => console.log('Heart beat'), 40000);

const LOCAL_FOLDER_RESOURCES = './resources/s3/';
const LOCAL_NODE_TEMPLATES = 'node-templates';
const LOCAL_NODE_TEMPLATE_PROJECT_BASE = 'node-template-project/base';

const run = async () => {
    try {
        /** Dependency Inject */
        const ioFileServicesInject = inject(() => { }, IOFileService)();
        await ioFileServicesInject.putTemplatesToS3(`${LOCAL_FOLDER_RESOURCES}${LOCAL_NODE_TEMPLATES}`);
        await ioFileServicesInject.putBaseProjectsTemplatesToS3(`${LOCAL_FOLDER_RESOURCES}${LOCAL_NODE_TEMPLATE_PROJECT_BASE}`);
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        clearInterval(idInterval);
        process.on('beforeExit', async () => {
            console.log('Process Completed');
            process.exit();
        });
    }

}

run();