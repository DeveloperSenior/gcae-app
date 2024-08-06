/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const DefaultException = require('../models/exception/DefaultException')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { STATES } = require('../utilities/Constants');
const { @EntityName@Model } = require('../models/@EntityName@Model');

/**
 * @EntityName@ Repository
 * @param {*} DbModel 
 * @returns 
 */
const @EntityName@Repository = DbModel => {

    /**
     * Create new @entityName@
     * @param {@EntityName@} @entityName@ to create
     * @returns 
     */
    const create@EntityName@ = async (@entityName@) => {
        try {
            @entityName@._id = new ObjectId;
            @entityName@.state = STATES.INITIAL;
            const new@EntityName@ = new DbModel(@entityName@);
            await new@EntityName@.save();
            return await DbModel.findOne({ _id: @entityName@._id }).select("-__v") // Retrieve without __v
            .populate('user', '-password -__v'); // Retrieve without password and __v
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
        const options = { _id: _id };
        try {
            return await DbModel.findOne({ _id: _id }).select("-__v") // Retrieve without __v
            .populate('user', '-password -__v'); // Retrieve without password and __v
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
            return await DbModel.find().select("-__v") // Retrieve without __v
            .populate('user', '-password -__v'); // Retrieve without password and __v
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
    const get@EntityName@ById = async (_id) => {
        try {
            return await DbModel.findOne({ _id: _id }).select("-__v"); // Retrieve without __v
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * find Launched Products Pager
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @returns 
     */
    const get@EntityName@Pager = async (pageSize, pageNumber, filter) => {
        try {
            let optionsfilter = { createdAt: { $ne: null } }
            if (filter){
                const { isFull, createdAt } = filter;
                if( isFull ){
                    optionsfilter = {}
                }
                if ( createdAt ) {
                    const filterDate = new Date(createdAt);
                    optionsfilter.createdAt = filterDate;
                }
                /** 
                 *  Break down the filter object and use it as a query filter
                 *  example: 
                 *   const { tags, name, rate } = filter;
                 *   if ( tags ) optionsfilter.tags = {$in: tags};
                 *   if ( name ) optionsfilter.name = {$regex: name, $options: 'i'};
                 *   if ( rate ) optionsfilter.rating = {$eq : rate};
                 */
            }
            const data = await DbModel.paginate(
                optionsfilter, // filters
                {
                    page: pageNumber,
                    limit: pageSize,
                    sort: { createdAt: 'asc' },
                    select: '-__v', // Retrieve without __v
                    populate: { path: 'user', select: '-password -__v' }
                });
            const { docs,totalDocs, totalPages, prevPage, nextPage } = data;
            return { actualPage: pageNumber, totalPage: totalDocs, prevPage: prevPage, nextPage: nextPage, data: docs };
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
    const edit@EntityName@ = async (_id, userId, @entityName@) => {
        const options = { _id: _id, user: userId };
        const set = {
            $set: @entityName@
        }
        try {
            await DbModel.findOneAndUpdate(options, set);
            return await DbModel.findOne(options).select("-__v")// Retrieve without __v
                .populate('user', '-password -__v'); // Retrieve without password and __v
                
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * delete @EntityName@ by Id
     * @param {*} product 
     * @returns 
     */
    const delete@EntityName@ = async (_id, userId) => {
        try {

            return await DbModel.deleteOne({ _id: _id, user: userId });

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