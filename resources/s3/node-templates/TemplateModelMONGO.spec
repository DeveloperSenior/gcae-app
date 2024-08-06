/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

const { Schema, model } = require('mongoose');
const { @EntityName@ } = require('./dto/@EntityName@');
const mongoosePaginate = require('mongoose-paginate-v2');

/** 
 * @EntityName@ Model ODM builder Schema
 */
const @entityName@Schema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        user: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'User' },
        @attrsModel@
        
    }
);


@entityName@Schema.loadClass(@EntityName@);
@entityName@Schema.plugin(mongoosePaginate);

const @EntityName@Model = model('@EntityName@', @entityName@Schema);

module.exports = { @EntityName@Model }
