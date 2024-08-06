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

    constructor(@attrsModel@) {

        this._id = _id;
        /** audit object */
        this.user = user;

        @attrModelSet@
        
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

        build() {

            return this.@entityName@;

        }
    }
}

module.exports = { @EntityName@ }