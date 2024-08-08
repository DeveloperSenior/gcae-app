/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { pipe } = require('../utilities/Utilities');
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

    /**
     * generate module impl
     * @param {*} appfolder 
     * @param {*} entityModel 
     */
    const generate = async (appfolder, entityModel, appConfig) => {

        const {
            name,
            description,
            fields
        } = entityModel;

        try{

        const ioFileServicesInject = pipe(() => { }, IOFileService)();

        const {data: propertiesListSwagger} = await ioFileServicesInject.getContentFileFromTemplate('SwaggerPropertiesList');
        const {data: propertiesNormalSwagger} = await ioFileServicesInject.getContentFileFromTemplate('SwaggerPropertiesNormal');
        const {data: requiredSwagger} = await ioFileServicesInject.getContentFileFromTemplate('SwaggerRequired');
        const {data: suscriptionRouterConfig} = await ioFileServicesInject.getContentFileFromTemplate('RouteSuscription');

        
        let swaggerRequireds = '';
        let swaggerProperties = '';
        fields?.forEach(field => {

            const { name, type, items, required } = field;

            if(required){
                swaggerRequireds = swaggerRequireds + requiredSwagger.replaceAll('@attr_name@',toCamelCase(name));
            }

            if ('Array' === (toPascalCase(type))) {
                const { ref } = items;
                swaggerProperties = swaggerProperties + propertiesListSwagger.replaceAll('@attr_name@', toCamelCase(name))
                    .replaceAll('@attr_type@', toCamelCase(type))
                    .replaceAll('@items_type@', toCamelCase(items.type));

                if ('Object' === (toPascalCase(items.type))) {
                    swaggerProperties = swaggerProperties.replaceAll('@ref_attr_object@',`$ref: '#/components/schemas/${toPascalCase(ref)}Model'`);
                }else{
                    swaggerProperties = swaggerProperties.replaceAll('@ref_attr_object@','');
                }

            }else{
                swaggerProperties = swaggerProperties + propertiesNormalSwagger.replaceAll('@attr_name@', toCamelCase(name))
                .replaceAll('@attr_type@', toCamelCase(type));
            }

            swaggerProperties = swaggerProperties;
            swaggerRequireds = swaggerRequireds;

        });

        await ioFileServicesInject.sanitizeFileContent(`${appfolder}/${FOLDER_TEMPLATE}/config/${ROUTE_SUSCRIPTION_CONF}`, `${appfolder}/${FOLDER_TEMPLATE}/config/${ROUTE_SUSCRIPTION_CONF}`,
            (target, data, createFile) => {
                const suscriptionRoute = suscriptionRouterConfig.replaceAll('@EntityName@',toPascalCase(name));
                const buffer = data.replaceAll('/** Import routes here */', suscriptionRoute);
                createFile(target, buffer);
            });

        await ioFileServicesInject.generateFileFromTemplate(TEMPLATE, `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`,
            (target, data, createFile) => {

                const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
                    .replaceAll('@entityName@', toCamelCase(name))
                    .replaceAll('@Description@', description)
                    .replaceAll('@swaggerRequireds@', swaggerRequireds)
                    .replaceAll('@swaggerProperties@', swaggerProperties);


                createFile(target, buffer);
            });
        }catch(e){
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