/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { pipe } = require('../utilities/Utilities');
const { toCamelCase, toPascalCase } = require('js-convert-case');
const { Observable } = require('rxjs');
const DefaultException = require('../models/exception/DefaultException');


/**
 * Model Generator Services
 * @returns 
 */
const ModelGeneratorService = () => {

    const TEMPLATE = 'Model';
    const FOLDER_TEMPLATE = 'src/models';

    /**
     * generate Model
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateModel = (entityModel,target, data, createFile,modelAttrDataBase) => {
        const {
            name,
            description,
            fields
        } = entityModel;

        let attrsModel = "";
        fields?.forEach(attr => {

            const getType = (_attr) => {
                const { type, items } = _attr;
                let dataType = '';
                if ("Array" === toPascalCase(type)) {
                    dataType = `[${toPascalCase(items.type)}]`
                } else {
                    dataType = `${toPascalCase(type)}`
                }
                return dataType;
            }
            const { name, pk, required, index } = attr;
            attrsModel = attrsModel + modelAttrDataBase.replaceAll('@attrName@', `${toCamelCase(name)}`)
                .replaceAll('@attrType@', getType(attr))
                .replaceAll('@attrRequire@', (required || pk) || false)
                .replaceAll('@attrIndex@', (index || pk) || false);

        }
        );

        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description)
            .replaceAll('@attrsModel@', attrsModel);

        createFile(target, buffer);
    }

    /**
     * generate DTO
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateDTO = (entityModel, target, data, createFile, modelBuilder) => {

        const {
            name,
            description,
            fields
        } = entityModel;

        let attrsModel = "";
        let attrModelSet = "";
        let attrModelBuild = "";
        fields?.forEach(attr => {

            attrsModel = attrsModel + `${toCamelCase(attr.name)},`;
            attrModelSet = attrModelSet + `this.${toCamelCase(attr.name)} = ${toCamelCase(attr.name)};\n`;
            attrModelBuild = attrModelBuild + modelBuilder.replaceAll('@AttrName@', toPascalCase(attr.name))
                .replaceAll('@attrName@', toCamelCase(attr.name)).replaceAll('@entityName@', toCamelCase(name)) + "\n";
        }
        );

        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@Description@', description)
            .replaceAll('@attrsModel@', attrsModel)
            .replaceAll('@attrModelSet@', attrModelSet)
            .replaceAll('@attrModelBuild@', attrModelBuild);

        createFile(target, buffer);
    };

    /**
     * generate module
     * @param {String} appfolder 
     * @param {Object} entityModel 
     * @param {Object} appConfig 
     */
    const generate = async (appfolder, entityModel, appConfig) => {

        try {

            const { type: dataBaseType } = appConfig.dataBase;
            const { name } = entityModel;
            const ioFileServicesInject = pipe(() => { }, IOFileService)();
            const { data: modelBuilder } = await ioFileServicesInject.getContentFileFromTemplate('ModelDTOBuilder');
            const { data: modelAttrDataBase } = await ioFileServicesInject.getContentFileFromTemplate(`Model${dataBaseType.toUpperCase()}Attr`);
            /** Model Generate */
            const { target, data, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE + dataBaseType.toUpperCase(), `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`);
            generateModel(entityModel,target, data, createFile, modelAttrDataBase);
            /** DTO Generate */
            const { target: targetDTO, data: dataDTO } =  await ioFileServicesInject.generateFileFromTemplate(`${TEMPLATE}DTO`, `${appfolder}/${FOLDER_TEMPLATE}/dto/${toPascalCase(name)}.js`);
            generateDTO(entityModel,targetDTO, dataDTO, createFile, modelBuilder);
        } catch (e) {
            console.log(e);
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }


    }

    return {
        generate
    }
}

module.exports = ModelGeneratorService;