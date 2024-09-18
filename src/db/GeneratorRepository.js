/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const DefaultException = require('../models/exception/DefaultException')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/**
 * Generator Repository
 * @param {*} DbModel 
 * @returns 
 */
const GeneratorRepository = DbModel => {

    /**
     * Create new app
     * @param {App} app to create
     * @returns 
     */
    const createApp = async (app) => {
        try {
            app._id = new ObjectId;
            const newApp = new DbModel(app);
            await newApp.save();
            return await DbModel.findOne({ _id: app._id }).select("-__v") // Retrieve without __v
            .populate('user', '-password -__v'); // Retrieve without password and __v
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get App
     * @param {App} app 
     * @returns 
     */
    const getApp = async (app) => {

        const { _id } = app;
        let options = {};
        if(_id){
            options = {_id: _id }
        }
        try {
            return await DbModel.findOne(options).select("-__v") // Retrieve without __v
            .populate('user', '-password -__v'); // Retrieve without password and __v
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }

    }

    /**
     * get All App
     * @param {getAllApp} app 
     * @returns 
     */
    const getAllApp = async (app) => {
        try {
            return await DbModel.find().select("-__v") // Retrieve without __v
            .populate('user', '-password -__v'); // Retrieve without password and __v
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get App By Id
     * @param {App} app 
     * @returns 
     */
    const getAppById = async (_id,userId) => {
        try {
            return await DbModel.findOne({ _id: _id }).select("-__v"); // Retrieve without __v
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

        /**
     * get App By Name
     * @param {App} app 
     * @returns 
     */
    const getAppByName = async (app) => {
        try {
            return await DbModel.findOne({ appName: app.appName, user: app.user }).select("-__v"); // Retrieve without __v
        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * get App Pager
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @returns 
     */
    const getAppPager = async (pageSize, pageNumber, filter) => {
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
     * update App by id
     * @param {App} app 
     * @returns 
     */
    const updateApp = async (_id, userId, app) => {
        const options = { _id: _id, user: userId };
        const set = {
            $set: app
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
     * delete App by Id
     * @param {*} app 
     * @returns 
     */
    const deleteApp = async (_id, userId) => {
        try {

            return await DbModel.deleteOne({ _id: _id, user: userId });

        } catch (e) {
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

   return {         
        createApp,
        updateApp,
        deleteApp,
        getAllApp,
        getApp,
        getAppById,
        getAppByName,
        getAppPager,
    }

}

module.exports = GeneratorRepository;