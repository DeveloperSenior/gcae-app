/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { pipe } = require('../utilities/Utilities');
const { createFolders, createFile, createFileAndUnzip, readFile } = require('../utilities/IOUtil');
const S3Service = require('./aws/S3Service');


/**
 * IO File Service
 * @param {*} generatorRepository 
 * @returns 
 */
const IOFileService = generatorRepository => {

    const bucketTemplates = process.env.BUCKET_TEMPLATE || `${process.env.ENV || 'dllo'}-gcae-templates`
    const nodeTemplateProject = process.env.NODE_TEMPLATE_PROJECT || 'node-template-project.zip';
    const nodeTemplates = process.env.NODE_TEMPLATES || 'node-templates';


    /**
     * 
     * @param {*} fileTemplateName file S3 fileName 
     * @param {*} target target to create file
     * @param {*} callback callback abstract function implement
     */
    const generateFileFromTemplate = async (fileTemplateName, target, callback) => {

        const s3ServiceInject = pipe(() => { }, S3Service)();
        const { fileName, data } = await s3ServiceInject.getObjectAsString(bucketTemplates, `${nodeTemplates}/Template${fileTemplateName}.spec`);
        /** callback abstract function */
        callback(target, data, createFile, fileName);
    }


    /**
     * Generate Base Project to app model data
     * @param {String} appfolder Configuration model of the app to be created
     * @param {*} callBack CallBack function to start when the function over
     */
    const generateBaseProject = async (appfolder, callBack) => {


        /** project root is created */
        createFolders(appfolder);

        const s3ServiceInject = pipe(() => { }, S3Service)();

        const { fileName, data } = await s3ServiceInject.getObjectAsByteArray(bucketTemplates, nodeTemplateProject);
        createFileAndUnzip(`${appfolder}/${fileName}`, appfolder, data, callBack);

    }

    /**
     * get all Content from File Template
     * @param {*} fileTemplateName 
     * @returns Json with content from file
     */
    const getContentFileFromTemplate = async (fileTemplateName) => {

        const s3ServiceInject = pipe(() => { }, S3Service)();
        const { data } = await s3ServiceInject.getObjectAsString(bucketTemplates, `${nodeTemplates}/Template${fileTemplateName}.spec`);
        return { fileName: fileTemplateName, data };
    }

    /**
 * get all Content from File Template
 * @param {*} fileTemplateName 
 * @returns Json with content from file
 */
    const sanitizeFileContent = async (file,target, callback, isLocal = true) => {

        let content = ''
        if (isLocal) {
            content = readFile(file);
        } else {
            const s3ServiceInject = pipe(() => { }, S3Service)();
            const { data } = await s3ServiceInject.getObjectAsString(bucketTemplates, `${nodeTemplates}/Template${file}.spec`);
            content = data;
        }
        callback(target, content, createFile)
    }


    return {
        generateBaseProject,
        generateFileFromTemplate,
        getContentFileFromTemplate,
        sanitizeFileContent
    }

}

module.exports = IOFileService;
