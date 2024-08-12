/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { pipe } = require('../utilities/Utilities');
const { HTTP_CODE } = require('../utilities/Constants');
const { defer } = require('rxjs');
const { toPascalCase,toCamelCase } = require('js-convert-case');

const IOFileService = require('../services/IOFileService');
const RouteGeneratorService = require('../services/RouteGeneratorService');
const ValidatorGeneratorService = require('../services/ValidatorGeneratorService');
const ControllerGeneratorService = require('../services/ControllerGeneratorService');
const ServiceGeneratorService = require('../services/ServiceGeneratorService');
const ModelGeneratorService = require('../services/ModelGeneratorService');
const RepositoryGeneratorService = require('../services/RepositoryGeneratorService');


const processEntity = async (appConfig, entity, appfolder) => {

    /** Dependency Inject */
    const modelGeneratorServiceInject = pipe(() => { }, ModelGeneratorService)();
    const routeGeneratorServiceInject = pipe(() => { }, RouteGeneratorService)();
    const validatorGeneratorServiceInject = pipe(() => { }, ValidatorGeneratorService)();
    const controllerGeneratorServiceInject = pipe(() => { }, ControllerGeneratorService)();
    const serviceGeneratorServiceInject = pipe(() => { }, ServiceGeneratorService)();
    const repositoryGeneratorServiceInject = pipe(() => { }, RepositoryGeneratorService)();

    /** Generator async subscribe */
    defer(async () => {

        /** Model Generate */
        await modelGeneratorServiceInject.generate(appfolder, entity, appConfig);
        /** Router Generate */
        await routeGeneratorServiceInject.generate(appfolder, entity);
        /** Validators Generate */
        await validatorGeneratorServiceInject.generate(appfolder, entity, appConfig);
        /** Controllers Generate */
        await controllerGeneratorServiceInject.generate(appfolder, entity, appConfig);
        /** Services Generate */
        await serviceGeneratorServiceInject.generate(appfolder, entity);
        /** Repository Generate */
        await repositoryGeneratorServiceInject.generate(appfolder, entity, appConfig);



    }).subscribe();



}

/**
 * generate Base Project
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const generateBaseProject = async (request, response) => {

    const basePath = process.env.BASE_PATH || 'tmp';

    try {
        const ioFileServicesInject = pipe(() => { }, IOFileService)();
        const { body } = request;
        /*const userSession = getSession(request);

        // Validate generator Model
        const validate = validateApp(body);

        if (!validate.isValid) {

            // if validation failure, send error response
            return response.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });

        }*/

        const {
            version,
            appName,
            appPort,
            appApiPath,
            author,
            email,
            appDescription,
            repository,
            dataBase,
            auth,
            cache,
            entities
        } = body;

        const appConfig = {
            appName,
            appPort,
            appApiPath,
            version,
            author,
            email,
            appDescription,
            repository,
            dataBase,
            cache
        }

        const appfolder = `${basePath}/${appName.toLowerCase()}-api`;

        const generateProject = (baseFiles) => {

            /** sanitize base file content */
            baseFiles?.filter(item => item.type === 'file').forEach(
                async file => {
                    const { path } = file;
                    await ioFileServicesInject.sanitizeFileContent(`${appfolder}/${path}`, `${appfolder}/${path}`,
                        (target, data, createFile) => {

                            const buffer = data.replaceAll('@appName@', toCamelCase(appName))
                                .replaceAll('@version@', version || '1.0')
                                .replaceAll('@email@', email || '')
                                .replaceAll('@appDescription@', appDescription)
                                .replaceAll('@typeRepository@', repository?.type || 'git')
                                .replaceAll('@urlRepository@', repository?.url || 'git.com')
                                .replaceAll('@appPort@', appPort || '3000')
                                .replaceAll('@appApiPath@', appApiPath || '/api/v1')
                                .replaceAll('@author@', author || 'TdeA')
                                .replaceAll('@dbHost@', dataBase?.host || 'change_it_example.com')
                                .replaceAll('@dbName@', dataBase?.serviceName || 'dbName_change_it')
                                .replaceAll('@dbUser@', dataBase?.user || 'dbUser_change_it')
                                .replaceAll('@dbToken@', dataBase?.pass || 'pass_change_it_base64')
                                .replaceAll('@dbProtocol@', dataBase?.protocol || 'http_change_it')
                                .replaceAll('@jwtSecretKey@', auth?.jwtSecretKey || 'jwtSecretkey_change_it_base64' )
                                .replaceAll('@cacheTTL@', cache?.ttl || '3600')
                                 /** always count 2 routes default */
                                .replaceAll('@countEntity@', (2 + entities?.length) || 2);
                            createFile(target, buffer);
                        });
                }
            );

            entities?.filter(entity => ('User' !== toPascalCase(entity.name) && 'Users' !== toPascalCase(entity.name)))
                .forEach(async (entity) => await processEntity(appConfig, entity, appfolder));
        }

        await ioFileServicesInject.generateBaseProject(appfolder, generateProject);

        return response.status(HTTP_CODE.CREATED).json(body);

    } catch (error) {

        return response.status(HTTP_CODE.ERROR).json(error);

    }


}

module.exports = {
    generateBaseProject
}