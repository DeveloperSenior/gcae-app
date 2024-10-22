/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { inject } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const DefaultException = require('../models/exception/DefaultException');



/**
 * Route Generator Services
 * @returns 
 */
const RouteGeneratorService = () => {

    const TEMPLATE = 'Route';
    const FOLDER_TEMPLATE = 'src/routes';
    const ROUTE_SUSCRIPTION_CONF = 'SuscriptionRoutesAppConf.js';
    const POSTMAN_COLLECTION_FILE = 'api.postman_collection.json'


    /**
     * generate Route
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateRoute = async (entityModel, target, data, createFile, ioFileServicesInject) => {

        const { data: propertiesListSwagger } = await ioFileServicesInject.getContentFileFromTemplate('SwaggerPropertiesList');
        const { data: propertiesNormalSwagger } = await ioFileServicesInject.getContentFileFromTemplate('SwaggerPropertiesNormal');
        const { data: requiredSwagger } = await ioFileServicesInject.getContentFileFromTemplate('SwaggerRequired');

        const {
            name,
            description,
            fields
        } = entityModel;


        let swaggerRequireds = '';
        let swaggerProperties = '';
        fields?.forEach(field => {

            const { name, type, items, required } = field;

            if (required) {
                swaggerRequireds = swaggerRequireds + requiredSwagger.replaceAll('@attr_name@', toCamelCase(name));
            }

            if ('Array' === (toPascalCase(type))) {
                const { ref } = items;
                swaggerProperties = swaggerProperties + propertiesListSwagger.replaceAll('@attr_name@', toCamelCase(name))
                    .replaceAll('@attr_type@', toCamelCase(type))
                    .replaceAll('@items_type@', toCamelCase(items.type));

                if ('Object' === (toPascalCase(items.type))) {
                    swaggerProperties = swaggerProperties.replaceAll('@ref_attr_object@', `$ref: '#/components/schemas/${toPascalCase(ref)}Model'`);
                } else {
                    swaggerProperties = swaggerProperties.replaceAll('@ref_attr_object@', '');
                }

            } else {
                swaggerProperties = swaggerProperties + propertiesNormalSwagger.replaceAll('@attr_name@', toCamelCase(name))
                    .replaceAll('@attr_type@', toCamelCase(type));
            }

        });

        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description)
            .replaceAll('@swaggerRequireds@', swaggerRequireds)
            .replaceAll('@swaggerProperties@', swaggerProperties);

        createFile(target, buffer);
    }

    /**
     * generate Postman Collection
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generatePostmanCollection = async (entityModel, target, data, createFile, ioFileServicesInject) => {

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
     * generate module
     * @param {String} appfolder 
     * @param {Object} entityModel 
     * @param {Object} appConfig
     */
    const generate = async (appfolder, entityModel, appConfig) => {


        try {
            const { name } = entityModel;
            const ioFileServicesInject = inject(() => { }, IOFileService)();
            const { data: suscriptionRouterConfig } = await ioFileServicesInject.getContentFileFromTemplate('RouteSuscription');

            const responseSanitize = await ioFileServicesInject.sanitizeFileContent(`${appfolder}/${FOLDER_TEMPLATE}/config/${ROUTE_SUSCRIPTION_CONF}`, `${appfolder}/${FOLDER_TEMPLATE}/config/${ROUTE_SUSCRIPTION_CONF}`);
            const suscriptionRoute = suscriptionRouterConfig.replaceAll('@EntityName@', toPascalCase(name));
            const buffer = responseSanitize.content.replaceAll('/** Import routes here */', suscriptionRoute);
            responseSanitize.createFile(responseSanitize.target, buffer);

            const { data: postmanCollectionData } = await ioFileServicesInject.getContentFileFromTemplate('PostmanCollection');
            const responseSanitizePostmanCollection = await ioFileServicesInject.sanitizeFileContent(`${appfolder}/${POSTMAN_COLLECTION_FILE}`, `${appfolder}/${POSTMAN_COLLECTION_FILE}`);
            const bufferPostmanCollection = responseSanitizePostmanCollection.content.replaceAll('@endpoints@',postmanCollectionData);
            /** Postman collection Generate */
            generatePostmanCollection(entityModel,responseSanitizePostmanCollection.target,bufferPostmanCollection,responseSanitizePostmanCollection.createFile);

            /** Route Generate */
            const { target, data, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`)
            generateRoute(entityModel, target, data, createFile, ioFileServicesInject);

        } catch (e) {
            console.error(e);
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }



    }

    return {
        generate
    }
}

module.exports = RouteGeneratorService;