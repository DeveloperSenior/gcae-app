/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

/**
 * @EntityName@Model Model builder object
 */
class @EntityName@ {

    /**
     * 
     * @param {*} _id 
     * @param {*} user 
     * @param {*} createdAt 
     * @param {*} updatedAt 
     * @param {*} data {*}
     */
    constructor(_id, user, createdAt, updatedAt, data) {

        this._id = _id;
        /** audit object */
        this.user = user;

        @attrModelSet@

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        
    }

    static Builder = class {

        constructor() {

            this.@entityName@ = new @EntityName@();

        }

        withId(_id) {
            this.@entityName@._id = _id;
            return this;
        }

        withUser(user){
            this.@entityName@.user = user;
            return this;
        }

        @attrModelBuild@

        withCreatedAt(createdAt) {

            this.@entityName@.createdAt = createdAt;

            return this;

        }

        withUpdatedAt(updatedAt) {

            this.@entityName@.updatedAt = updatedAt;

            return this;

        }

        build() {

            return this.@entityName@;

        }
    }
}

module.exports = { @EntityName@ }