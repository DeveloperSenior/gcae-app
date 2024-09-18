/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { inject, getSession } = require('../utilities/Utilities');
const { HTTP_CODE } = require('../utilities/Constants');
const { toCamelCase, toPascalCase } = require('js-convert-case');

const IOFileService = require('../services/IOFileService');
const RouteGeneratorService = require('../services/RouteGeneratorService');
const ValidatorGeneratorService = require('../services/ValidatorGeneratorService');
const ControllerGeneratorService = require('../services/ControllerGeneratorService');
const ServiceGeneratorService = require('../services/ServiceGeneratorService');
const ModelGeneratorService = require('../services/ModelGeneratorService');
const RepositoryGeneratorService = require('../services/RepositoryGeneratorService');

const GeneratorService = require('../services/GeneratorService');
const GeneratorRepository = require('../db/GeneratorRepository');
const { AppModel } = require('../models/AppModel');

const { readDir, deleteFile } = require('../utilities/IOUtil');

/** Dependency Inject */
const ioFileServicesInject = inject(() => { }, IOFileService)();

const basePath = process.env.BASE_PATH || 'tmp';

/**
 * process Entity
 * @param {*} appConfig 
 * @param {*} entity 
 * @param {*} appfolder 
 * @param {*} userSession 
 */
const processEntity = async (appConfig, entity, appfolder, userSession) => {

    try {

        /** Dependency Inject */
        const modelGeneratorServiceInject = inject(() => { }, ModelGeneratorService)();
        const routeGeneratorServiceInject = inject(() => { }, RouteGeneratorService)();
        const validatorGeneratorServiceInject = inject(() => { }, ValidatorGeneratorService)();
        const controllerGeneratorServiceInject = inject(() => { }, ControllerGeneratorService)();
        const serviceGeneratorServiceInject = inject(() => { }, ServiceGeneratorService)();
        const repositoryGeneratorServiceInject = inject(() => { }, RepositoryGeneratorService)();

        /** Model Generate */
        await modelGeneratorServiceInject.generate(`${basePath}/${appfolder}`, entity, appConfig);
        /** Router Generate */
        await routeGeneratorServiceInject.generate(`${basePath}/${appfolder}`, entity);
        /** Validators Generate */
        await validatorGeneratorServiceInject.generate(`${basePath}/${appfolder}`, entity, appConfig);
        /** Controllers Generate */
        await controllerGeneratorServiceInject.generate(`${basePath}/${appfolder}`, entity, appConfig);
        /** Services Generate */
        await serviceGeneratorServiceInject.generate(`${basePath}/${appfolder}`, entity);
        /** Repository Generate */
        await repositoryGeneratorServiceInject.generate(`${basePath}/${appfolder}`, entity, appConfig);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * sanitize Base Project
 * @param {*} target 
 * @param {*} data 
 * @param {*} createFile 
 */
const sanitizeBaseProject = (body, target, data, createFile) => {

    const {
        version,
        appName,
        appPort,
        appApiPath,
        author,
        company,
        email,
        appDescription,
        repository,
        dataBase,
        auth,
        cache,
        entities
    } = body;

    const buffer = data.replaceAll('@appName@', toCamelCase(appName))
        .replaceAll('@APPNAME@', appName.toUpperCase())
        .replaceAll('@appname@', appName.toLowerCase())
        .replaceAll('@version@', version || '1.0')
        .replaceAll('@email@', email || '')
        .replaceAll('@appDescription@', appDescription)
        .replaceAll('@typeRepository@', repository?.type || 'git')
        .replaceAll('@urlRepository@', repository?.url || 'git.com')
        .replaceAll('@appPort@', appPort || '3000')
        .replaceAll('@appApiPath@', appApiPath || '/api/v1')
        .replaceAll('@author@', author || 'TdeA')
        .replaceAll('@company@', company || 'Tecnologico de Antioquia')
        .replaceAll('@dbHost@', dataBase?.host || 'change_it_example.com')
        .replaceAll('@dbName@', dataBase?.serviceName || 'dbName_change_it')
        .replaceAll('@dbUser@', dataBase?.user || 'dbUser_change_it')
        .replaceAll('@dbToken@', dataBase?.pass || 'pass_change_it_base64')
        .replaceAll('@dbProtocol@', dataBase?.protocol || 'http_change_it')
        .replaceAll('@jwtSecretKey@', auth?.jwtSecretKey || 'jwtSecretkey_change_it_base64')
        .replaceAll('@cacheTTL@', cache?.ttl || '3600')
        .replaceAll('@endpoints@', '')
        /** always count 2 routes default */
        .replaceAll('@countEntity@', 2 + entities?.length);
    createFile(target, buffer);
}

/**
 * generate Project
 * @param {*} entities 
 * @param {*} appfolder 
 * @param {*} userSession 
 */
const generateProject = async (body, entities, appfolder, userSession) => {

    console.log('INIT processEntity');
    const dataToprocess = entities?.filter(entity => 'User' !== toPascalCase(entity.name) && 'Users' !== toPascalCase(entity.name));
    for await (entity of dataToprocess) {
        try {
            console.log(`processing entity ${entity.name}`);
            await processEntity(body, entity, appfolder, userSession);
            console.log(`entity ${entity.name} processed`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    console.log('END processEntity');

}

/**
 * main program
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const main = async (request, response) => {

    try {

        const generatorServiceInject = inject(GeneratorRepository, GeneratorService)(AppModel);

        const { body } = request;
        const userSession = getSession(request);

        // Validate generator Model
        /* const validate = validateApp(body);
 
         if (!validate.isValid) {
 
             // if validation failure, send error response
             return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });
 
         }*/

        const {
            appName,
            entities
        } = body;

        const appfolder = `${appName.toLowerCase()}-api`;
        console.log('INIT PROCESS');
        await ioFileServicesInject.generateBaseProject(`${basePath}/${appfolder}`);
        await generateProject(body, entities, appfolder, userSession);

        baseFiles = readDir(`${basePath}/${appfolder}`, true, true);

        /** sanitize base file content */
        console.log('INIT sanitize');
        const dataToSanitize = baseFiles?.filter(item => item.isFile());
        for await (file of dataToSanitize) {
            const { path, name } = file;
            const { target, content, createFile } = await ioFileServicesInject.sanitizeFileContent(`${path}/${name}`, `${path}/${name}`);
            sanitizeBaseProject(body, target, content, createFile);
        }
        console.log('END sanitize');

        baseIaCFiles = readDir(`${basePath}/${appfolder}-iac`, true, true);

        /** sanitize base IaC file content */
        console.log('INIT sanitize IaC');
        const dataIaCToSanitize = baseIaCFiles?.filter(item => item.isFile());
        for await (file of dataIaCToSanitize) {
            const { path, name } = file;
            const { target, content, createFile } = await ioFileServicesInject.sanitizeFileContent(`${path}/${name}`, `${path}/${name}`);
            sanitizeBaseProject(body, target, content, createFile);
        }
        console.log('END sanitize IaC');

        console.log('END PROCESS');
        /** Create App DB */
        await generatorServiceInject.createApp(body, userSession);
        /** put Zip S3*/
        const { fileName, buffer } = await ioFileServicesInject.saveFile(basePath, `${appfolder}`);
        response.set('Content-Type', 'application/octet-stream');
        response.set('Content-Disposition', `attachment; filename=${fileName}`);
        response.set('Content-Length', buffer.length);

        /** Clear FileSystem */
        deleteFile(`${basePath}/${appfolder}`);
        deleteFile(`${basePath}/${appfolder}-iac`);


        return response.status(HTTP_CODE.CREATED).send(buffer);

    } catch (error) {
        console.log(error);
        return response.status(HTTP_CODE.ERROR).json(error);

    }


}

/**
 * get existing App
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const getApp = async (request, response) => {
    try {
        const generatorServiceInject = inject(GeneratorRepository, GeneratorService)(AppModel);
        const { params } = request;
        const { appName } = params;
        const userSession = getSession(request);
        const appfolder = `${appName.toLowerCase()}-api`;
        const { fileName, buffer } = await generatorServiceInject.getAppByName(appName,appfolder,userSession);
        
        response.set('Content-Type', 'application/octet-stream');
        response.set('Content-Disposition', `attachment; filename=${fileName}`);
        response.set('Content-Length', buffer.length);

        return response.status(HTTP_CODE.OK).send(buffer);

    } catch (error) {
        console.log(error);
        return response.status(HTTP_CODE.ERROR).json(error);

    }
}

/**
 * get existing App
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const getDemo = async (request, response) => {
    try {
        const generatorServiceInject = inject(GeneratorRepository, GeneratorService)(AppModel);
        const { params } = request;
        const { appName } = params;
        const userSession = getSession(request);
        const appfolder = `${appName.toLowerCase()}-api`;
        const { fileName, buffer } = await generatorServiceInject.getAppByName(appName,appfolder,userSession);
        
        response.set('Content-Type', 'application/octet-stream');
        response.set('Content-Disposition', `attachment; filename=${fileName}`);
        response.set('Content-Length', buffer.length);

        return response.status(HTTP_CODE.OK).send(buffer);

    } catch (error) {
        console.log(error);
        return response.status(HTTP_CODE.ERROR).json(error);

    }
}

module.exports = {
    main,
    getApp,
    getDemo
}