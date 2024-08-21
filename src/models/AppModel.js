/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

const { Schema, model } = require('mongoose');
const { App } = require('./dto/App');
const mongoosePaginate = require('mongoose-paginate-v2');

/** 
 * App Model ODM builder Schema
 */
const appSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        user: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'User' },
        
        appName: { type: String, required: true, index: true },

        appPort: { type: Number, required: true, index: false },

        appDescription: { type: String, required: true, index: false },

        author: { type: String, required: true, index: false },

        version: { type: String, required: true, index: false },

        repository: { type: Object, required: true, index: false },

        repository: { type: Object, required: true, index: false },

        cache: { type: Object, required: true, index: false },

        dataBase: { type: Object, required: true, index: false },

        entities: { type: [Object], required: true, index: false },

        createdAt: { type: Date, required: true, index: true},
        updatedAt: { type: Date, index: true},
        
    }
);


appSchema.loadClass(App);
appSchema.plugin(mongoosePaginate);

module.exports = {AppModel: model('App', appSchema)};

