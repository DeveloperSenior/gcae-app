/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { inject, isDebug } = require('../utilities/Utilities');
const { createFolders,
    createFile,
    createFileAndUnzip,
    readFile,
    unzipFile } = require('../utilities/IOUtil');
const S3Service = require('./aws/S3Service');
const admz = require('adm-zip');


/**
 * IO File Service
 * @param {*} generatorRepository 
 * @returns 
 */
const IOFileService = generatorRepository => {

    const bucketTemplates = process.env.BUCKET_TEMPLATE || `${process.env.ENV || 'dllo'}-gcae-templates`
    const nodeTemplateProject = process.env.NODE_TEMPLATE_PROJECT || 'node-template.zip';
    const nodeTemplates = process.env.NODE_TEMPLATES || 'node-templates';
    const bucketFolderApps = process.env.BUCKET_FOLDER_APPS || 'apps';


    /**
     * generate File FromTemplate
     * @param {*} fileTemplateName file S3 fileName 
     * @param {*} target target to create file
     */
    const generateFileFromTemplate = async (fileTemplateName, target) => {

        try {
            const s3ServiceInject = inject(() => { }, S3Service)();
            const { fileName, data } = await s3ServiceInject.getObjectAsString(bucketTemplates, `${nodeTemplates}/Template${fileTemplateName}.spec`);
            return {
                target: target, data: data, createFile: createFile, fileName: fileName
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * Generate Base Project to app model data
     * @param {String} appfolder Configuration model of the app to be created
     */
    const generateBaseProject = async (appfolder, dbType) => {


        /** project root is created */
        if (isDebug)
            console.log('Crear folders');
        createFolders(appfolder);
        createFolders(`${appfolder}-iac`);

        const s3ServiceInject = inject(() => { }, S3Service)();

        const { data } = await s3ServiceInject.getObjectAsByteArray(bucketTemplates, `base/${dbType.toUpperCase()}/${nodeTemplateProject}`);
        await createFileAndUnzip(`${appfolder}/${nodeTemplateProject}`, appfolder, data);
        await unzipFile(`${appfolder}/iac.zip`, `${appfolder}-iac`);
        return { target: appfolder, data: data }
    }

    /**
     * get all Content from File Template
     * @param {*} fileTemplateName 
     * @returns Json with content from file
     */
    const getContentFileFromTemplate = async (fileTemplateName) => {

        const s3ServiceInject = inject(() => { }, S3Service)();
        const { data } = await s3ServiceInject.getObjectAsString(bucketTemplates, `${nodeTemplates}/Template${fileTemplateName}.spec`);
        return { fileName: fileTemplateName, data: data };
    }

    /**
     * sanitize File Content
     * @param {*} file 
     * @param {*} target 
     * @param {*} callback 
     * @param {*} isLocal 
     */
    const sanitizeFileContent = (file, target, isLocal = true) => {

        let content = ''
        if (isLocal) {
            content = readFile(file);
        } else {
            const s3ServiceInject = inject(() => { }, S3Service)();
            const { data } = s3ServiceInject.getObjectAsString(bucketTemplates, `${nodeTemplates}/Template${file}.spec`);
            content = data;
        }
        return {
            target: target, content: content, createFile: createFile
        }
    }

    /**
     * save File
     * @param {*} folder 
     */
    const saveFile = async (basePath, folder) => {

        const s3ServiceInject = inject(() => { }, S3Service)();
        const zp = new admz();
        const zipName = `${folder}.zip`;
        zp.addLocalFolder(`${basePath}/${folder}`, `${folder}-server`);
        zp.addLocalFolder(`${basePath}/${folder}-iac`, `${folder}-iac`);

        const data = zp.toBuffer();

        await s3ServiceInject.putObject(`${bucketTemplates}`, `${bucketFolderApps}/${zipName}`, data);

        return { fileName: zipName, buffer: data };

    }

    /**
     * get app file AWS 
     * @param {*} appName 
     */
    const getAppFile = async (appName) => {

        const zipName = `${appName}.zip`;

        const s3ServiceInject = inject(() => { }, S3Service)();
        const { data } = await s3ServiceInject.getObjectAsByteArray(bucketTemplates, `${bucketFolderApps}/${zipName}`);
        return { fileName: zipName, buffer: data };

    }

    return {
        generateBaseProject,
        generateFileFromTemplate,
        getContentFileFromTemplate,
        sanitizeFileContent,
        saveFile,
        getAppFile
    }

}

module.exports = IOFileService;
