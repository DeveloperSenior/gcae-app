/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const IOFileService = require('./IOFileService');
const { inject } = require('../utilities/Utilities');
const { DB_TYPE, FIELD_TYPE } = require('../utilities/Constants');
const { toCamelCase, toPascalCase, toUpperCase, toSnakeCase, toLowerCase } = require('js-convert-case');
const { getValueTest } = require('../utilities/ValuesTest');
const DefaultException = require('../models/exception/DefaultException');



/**
 * Repository Generator Services
 * @returns 
 */
const RepositoryGeneratorService = () => {

    const TEMPLATE = 'Repository';
    const FOLDER_TEMPLATE = 'src/db';
    const TEMPLATE_TEST = 'Repository{dataBaseType}Test';
    const FOLDER_TEMPLATE_TEST = 'test/db';
    const FILE_MIGRATIONS = 'migrations.sql';
    const SQL_TYPE = "SQL";

    /**
     * generate Migrations only Data Base SQL type
     * @param {*} entityModel 
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateMigrations = async (entityModel, target, data, createFile, ioFileServicesInject) => {

        const { data: DDL } = await ioFileServicesInject.getContentFileFromTemplate('Migrations');

        const {
            name,
            description,
            fields
        } = entityModel;

        let attrModelUpper = '';
        let constraints = '';
        let alterTable = '';
        let index = 1;

        fields?.forEach(attr => {
            const { name, type, pk, required, precision, scale } = attr;
            const fieldName = toUpperCase(toSnakeCase(toCamelCase(name)));
            const scaleValue = scale ? ',' + scale : '';
            const fieldPrecision = toPascalCase(type) === 'Relationship' || toPascalCase(type) === 'Date' ? '' : `(${precision}${scaleValue})`;
            const fieldDefinition = `${FIELD_TYPE(toUpperCase(type))} ${fieldPrecision} ${(pk || required ? 'NOT' : '')} NULL`;
            attrModelUpper = attrModelUpper + `${fieldName} ${fieldDefinition},\n`;
        }
        );

        const fieldsRequired = fields?.filter(field => (field.pk || field.required))
        fieldsRequired.forEach(attr => {
            const { name, type, items } = attr;
            let quoted = "";
            if (index < fieldsRequired.length) {
                quoted = ",";
            }
            const fieldName = toUpperCase(toSnakeCase(toCamelCase(name)));
            if (toPascalCase(type) === 'Relationship') {
                alterTable = alterTable + `ALTER TABLE T@ENTITYNAME@ ADD CONSTRAINT T@ENTITYNAME@_${fieldName}_FK FOREIGN KEY(${fieldName}) REFERENCES T${toUpperCase(items?.ref)}(_ID);\n`;
            }

            constraints = constraints + `CONSTRAINT T@ENTITYNAME@_${fieldName}_KEY UNIQUE (${fieldName})${quoted}\n`;

            ++index
        }
        );

        const buffer = DDL.replaceAll('@ATTRMODEL@', attrModelUpper)
            .replaceAll('@CONSTRAINTS@', constraints)
            .replaceAll('@ALTERTABLE@', alterTable)
            .replaceAll('@Description@', toUpperCase(description))
            .replaceAll('@ENTITYNAME@', toUpperCase(name));

        createFile(target, data.replaceAll('@CREATETABLE@', buffer));
    }

    /**
     * generate Repository
     * @param {*} target 
     * @param {*} data 
     * @param {*} createFile 
     */
    const generateRepository = async (entityModel, target, data, createFile) => {
        const {
            name,
            description,
            fields
        } = entityModel;

        let attrModelUpper = "";
        let attrModelUpperAlias = "";
        let attrModel = "";
        let attrUpdateField = "";
        let index = 1;
        fields?.forEach(attr => {
            let quoted = "";
            if (index < fields.length) {
                quoted = ",";
            }
            attrModelUpper = attrModelUpper + `${toUpperCase(toSnakeCase(toCamelCase(attr.name)))}${quoted}`;
            attrModelUpperAlias = attrModelUpperAlias + `T.${toUpperCase(toSnakeCase(toCamelCase(attr.name)))}${quoted}`;
            attrModel = attrModel + `${toCamelCase(attr.name)}${quoted} `;
            attrUpdateField = attrUpdateField + `${toUpperCase(toSnakeCase(toCamelCase(attr.name)))} = %L ${quoted}`;
            ++index
        }
        );

        let attrRelationship = '';
        let attrRelationshipPager = '';
        const relationshipFilter = fields?.filter(attr => toPascalCase(attr.type) === 'Relationship');
        relationshipFilter.forEach(attr => {
            attrRelationship = attrRelationship + `.populate('${toCamelCase(attr.name)}','-user -__v ')`;
            attrRelationshipPager = attrRelationshipPager + `{ path: '${toCamelCase(attr.name)}', select: '-user -__v' },`;
        }
        );


        const buffer = data.replaceAll('@EntityName@', toPascalCase(name))
            .replaceAll('@ENTITYNAME@', toUpperCase(name))
            .replaceAll('@entityName@', toCamelCase(name))
            .replaceAll('@attrModel@', attrModel)
            .replaceAll('@ATTRMODEL@', attrModelUpper)
            .replaceAll('@ATTRMODELALIAS@', attrModelUpperAlias)
            .replaceAll('@ATTRMODELUPDATE@', attrUpdateField)
            .replaceAll('@relationship@', attrRelationship)
            .replaceAll('@relationshippager@', attrRelationshipPager)
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
        try {
            const { type: dataBaseType } = appConfig.dataBase;

            const {
                name,
                fields
            } = entityModel;

            const ioFileServicesInject = inject(() => { }, IOFileService)();

            if (SQL_TYPE === DB_TYPE(toUpperCase(dataBaseType))) {
                /** Generate migrations */
                const { target: targetMigrations, content: dataMigrations, createFile: createFileMigrations } = await ioFileServicesInject.sanitizeFileContent(`${appfolder}/${FILE_MIGRATIONS}`, `${appfolder}/${FILE_MIGRATIONS}`);
                generateMigrations(entityModel, targetMigrations, dataMigrations, createFileMigrations, ioFileServicesInject);
            }

            /** Generate repository */
            const { target, data, createFile } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE + toUpperCase(dataBaseType), `${appfolder}/${FOLDER_TEMPLATE}/${toPascalCase(name + TEMPLATE)}.js`);
            generateRepository(entityModel, target, data, createFile);

            let attrModelBuildValue = "";
            fields?.forEach(attr => {

                attrModelBuildValue = attrModelBuildValue + `.with${toPascalCase(attr.name)}(${getValueTest(attr)})\n`;

            }
            );

            /** Generate Test repository */
            const { target: targetTest, data: dataTest } = await ioFileServicesInject.generateFileFromTemplate(TEMPLATE_TEST.replaceAll('{dataBaseType}', toUpperCase(dataBaseType)), `${appfolder}/${FOLDER_TEMPLATE_TEST}/${toPascalCase(name + TEMPLATE)}.test.js`);
            generateTest(entityModel, targetTest, dataTest, createFile, attrModelBuildValue);
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

module.exports = RepositoryGeneratorService;