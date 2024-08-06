/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

const { Schema, model } = require('mongoose');
const { User } = require('./dto/User');

/** 
 * User Model ODM builder Schema
 */
const userSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        userName: { type: String, required: true, index: true },
        bio: String,
        avatar: String,
        email: { type: String, required: true, index: true, unique: true},
        password: { type: String, required: true },
        createdAt: { type: Date, required: true, index: true},
        updatedAt: { type: Date, index: true},
    }
);

userSchema.loadClass(User);

const UserModel = model('User', userSchema);

module.exports = { UserModel }