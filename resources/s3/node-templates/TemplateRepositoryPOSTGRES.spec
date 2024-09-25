/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const DefaultException = require('../models/exception/DefaultException')
const { STATES } = require('../utilities/Constants');
const format = require('pg-format');
const { Pager } = require('../models/dto/Pager');

const QUERYS = {
   insert : 'INSERT INTO T@ENTITYNAME@S (@ATTRMODEL@, USERID, CREATEDAT ) VALUES (%L) RETURNING _ID',
   findById : 'SELECT T._ID,U._ID AS USERID, @ATTRMODELALIAS@, T.CREATEDAT, T.UPDATEDAT FROM  T@ENTITYNAME@S T, TUSERS U WHERE T.USERID = U._ID AND T._ID = %L',
   find : 'SELECT T._ID,U._ID AS USERID, @ATTRMODELALIAS@, T.CREATEDAT, T.UPDATEDAT FROM  T@ENTITYNAME@S T, TUSERS U WHERE T.USERID = U._ID',
   findPager : `SELECT T._ID,U._ID AS USERID, 
                @ATTRMODELALIAS@,
                T.CREATEDAT,
                T.UPDATEDAT 
                FROM  T@ENTITYNAME@S T, TUSERS U 
                WHERE T.USERID = U._ID
                %s
                %s`,
    count : 'SELECT COUNT(1) total FROM T@ENTITYNAME@S T WHERE T.CREATEDAT IS NOT NULL',
    update : `UPDATE T@ENTITYNAME@S
              SET 
                USERID = %L,
                CREATEDAT = NOW(),
                @ATTRMODELUPDATE@
              WHERE _ID = %L`,
    delete : `DELETE FROM T@ENTITYNAME@S T
              WHERE T._ID = %L`
    }

/**
 * @EntityName@ Repository
 * @param {*} pool 
 * @returns 
 */
const @EntityName@Repository = pool => {

    /**
     * Create new @entityName@
     * @param {@EntityName@} @entityName@ to create
     * @returns 
     */
    const create@EntityName@ = async (@entityName@) => {
        try {
            @entityName@.state = STATES.INITIAL;
            const {
                @attrModel@,
                user,
                createdAt
            } = @entityName@;

            const sql = format(QUERYS.insert, [@attrModel@, user, createdAt]); 
            const result = await pool.query(sql);
            const _id = result.rows[0]._id;
            return await get@EntityName@ById(_id);
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get @EntityName@
     * @param {@EntityName@} @entityName@ 
     * @returns 
     */
    const get@EntityName@ = async (@entityName@) => {

        const { _id } = @entityName@;
        try {
            return await get@EntityName@ById(_id);
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get All @EntityName@
     * @param {getAll@EntityName@} @entityName@ 
     * @returns 
     */
    const getAll@EntityName@ = async (@entityName@) => {
        try {
            const sql = format(QUERYS.find); 
            const result = await pool.query(sql);
            return result.rows;
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get @EntityName@ By Id
     * @param {@EntityName@} @entityName@ 
     * @returns 
     */
    const get@EntityName@ById = async (_id,userId) => {
        try {
           const sql = format(QUERYS.findById, _id); 
           const result = await pool.query(sql);
           return result.rows[0];
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get @EntityName@ Pager
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @returns 
     */
    const get@EntityName@Pager = async (pageSize, pageNumber, filter) => {
        try {
            let offSet = 0;
            if (pageNumber !== 0) {
                offSet = pageNumber * pageSize;
            }

            let optionsfilter = 'AND T.CREATEDAT IS NOT NULL ';
            if (filter) { /** Include custom filters */ }

            const resultTotal = await pool.query(format(QUERYS.count));
            const total = Number(resultTotal.rows[0].total);
            const sql = format(QUERYS.findPager, optionsfilter, `offset ${offSet} limit ${pageSize}`);
            const result = await pool.query(sql);
            const data = result.rows;
            return new Pager.Builder()
                .withActualPage(pageNumber)
                .withTotalPage(Math.round(total / pageSize))
                .withPrevPage(pageNumber - 1)
                .withNextPage(pageNumber + 1)
                .withData(data).build();

        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * update @EntityName@ by id
     * @param {@EntityName@} @entityName@ 
     * @returns 
     */
    const update@EntityName@ = async (_id, userId, @entityName@) => {

        try {
            const { @attrModel@ } = @entityName@
            const sql = format(QUERYS.update,userId,@attrModel@, _id); 
            await pool.query(sql);
            return await get@EntityName@ById(_id);
                
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * delete @EntityName@ by Id
     * @param {*} @entityName@ 
     * @returns 
     */
    const delete@EntityName@ = async (_id, userId) => {
        try {

           const sql = format(QUERYS.delete, _id); 
           return await pool.query(sql);

        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

   return {         
        create@EntityName@,
        update@EntityName@,
        delete@EntityName@,
        getAll@EntityName@,
        get@EntityName@,
        get@EntityName@ById,
        get@EntityName@Pager,
    }

}

module.exports = @EntityName@Repository;