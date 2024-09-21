/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

/**
 * User Model builder object
 */
class User {
    
    /**
     * 
     * @param {*} _id 
     * @param {*} data {username, bio, avatar, email, password}
     * @param {*} createdAt 
     * @param {*} updatedAt 
     */
    constructor(_id, data , createdAt, updatedAt,) {
        this._id = _id;
        this.username = data?.username;
        this.bio = data?.bio;
        this.avatar = data?.avatar;
        this.email = data?.email;
        this.password = data?.password ;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }
    static Builder = class {
        constructor() {

            this.user = new User();

        }
        withId(_id) {

            this.user._id = _id;

            return this;

        }
        withUserName(userName) {

            this.user.userName = userName;

            return this;

        }
        withBio(bio) {

            this.user.bio = bio;

            return this;

        }
        withAvatar(avatar){

            this.user.avatar = avatar;

            return this;

        }
        withEmail(email) {

            this.user.email = email;
            
            return this;

        }
        withPassword(password) {

            this.user.password = password;

            return this;

        }
        withCreatedAt(createdAt) {

            this.user.createdAt = createdAt;
            return this;

        }
        withUpdatedAt(updatedAt) {

            this.user.updatedAt = updatedAt;
            return this;

        }
        build() {

            return this.user;

        }
    };
}

module.exports = { User }