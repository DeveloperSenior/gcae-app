/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { @EntityName@ } = require('../../src/models/dto/@EntityName@');
const moment = require('moment');
const { DATE_FORMAT } = require('../utilities/Constants');
const { ERROR_MESSAGE, ERROR_CODE, ERROR_TYPE } = require('../utilities/Constants');
const DefaultException = require('../models/exception/DefaultException')


/**
 * @EntityName@ Service
 * @param {*} @entityName@Repository 
 * @returns 
 */
const @EntityName@Service = @entityName@Repository => {

    /**
     * create @EntityName@
     * @param {*} @entityName@ 
     * @param {*} userSession 
     * @returns 
     */
    const create@EntityName@ = async (@entityName@, userSession) => {

        const { userId } = userSession;
        const { @attrsModel@ } = @entityName@;
        const currentDate = moment().format(DATE_FORMAT.DEFAULT);
        const @entityName@Builder = new @EntityName@.Builder()
            .withUser(userId)
            @attrModelBuild@
            .withCreatedAt(currentDate)
            .build();

        return await @entityName@Repository.create@EntityName@(@entityName@Builder);

    }

    /**
     * get @EntityName@
     * @param {*} userSession 
     * @returns 
     */
    const get@EntityName@ = async (params,userSession) => {
        const { userId } = userSession;
        
        const @entityName@ToGetBuilder = new @EntityName@.Builder()
        /** add params filters to builder here*/
            .withUser(userId).build();

        return await @entityName@Repository.get@EntityName@(@entityName@ToGetBuilder);
    }

    /**
    * get All @EntityName@ 
    * @param {*} request 
    * @param {*} response 
    * @returns 
    */
    const getAll@EntityName@ = async (userSession) => {

        const { userId } = userSession;
        
        const @entityName@ = new @EntityName@.Builder()
        /** add params filters to builder here*/
            .withUser(userId).build();

        return await @entityName@Repository.getAll@EntityName@();
    }

    /**
     * get all @EntityName@ Pager
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @param {*} body 
     * @returns 
     */
    const get@EntityName@Pager = async (pageSize, pageNumber, body) => {

        return await @entityName@Repository.get@EntityName@Pager(pageSize, Math.max(0, pageNumber), body);
    }

    /**
     * update @EntityName@
     * @param {*} _id 
     * @param {*} @entityName@ 
     * @param {*} userSession 
     * @returns 
     */
    const update@EntityName@ = async (_id, @entityName@, userSession) => {

        const { userId } = userSession;

        const exists@EntityName@ = await @entityName@Repository.get@EntityName@ById(_id, userId);
        if (!exists@EntityName@) {
            const exception = new DefaultException(ERROR_MESSAGE.ENTITY_ISNT_SESSION);
            exception.code = ERROR_CODE.VALIDATE;
            exception.type = ERROR_TYPE.VALIDATE;
            throw exception
        }

        @entityName@.UpdateAt = moment().format(DATE_FORMAT.DEFAULT);

        return await @entityName@Repository.update@EntityName@(_id, userId, @entityName@);

    }

    /**
     * delete @EntityName@
     * @param {*} _id 
     * @param {*} userSession 
     * @returns 
     */
    const delete@EntityName@ = async (_id, userSession) => {

        const { userId } = userSession;

        const exists@EntityName@ = await @entityName@Repository.get@EntityName@ById(_id, userId);
        if (!exists@EntityName@) {
            const exception = new DefaultException(ERROR_MESSAGE.ENTITY_ISNT_SESSION);
            exception.code = ERROR_CODE.VALIDATE;
            exception.type = ERROR_TYPE.VALIDATE;
            throw exception
        }
        return await @entityName@Repository.delete@EntityName@(_id, userId);

    }

    return {
        create@EntityName@,
        update@EntityName@,
        delete@EntityName@,
        getAll@EntityName@,
        get@EntityName@,
        get@EntityName@Pager,
    }
}

module.exports = @EntityName@Service;