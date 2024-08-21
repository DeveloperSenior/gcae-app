/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

/**
 * AppModel Model builder object
 */
class App {

    constructor(_id, user, createdAt, updatedAt, appName, appPort, appDescription, author, version, repository, cache, dataBase, entities, auth) {

        this._id = _id;
        /** audit object */
        this.user = user;

        this.appName = appName;
        this.appPort = appPort;
        this.appDescription = appDescription;
        this.author = author;
        this.auth = auth;
        this.version = version;
        this.repository = repository;
        this.cache = cache;
        this.dataBase = dataBase;
        this.entities = entities;


        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }

    static Builder = class {

        constructor() {

            this.app = new App();

        }

        withId(_id) {
            this.app._id = _id;
            return this;
        }

        withUser(user) {
            this.app.user = user;
            return this;
        }


        withAppName(appName) {
            this.app.appName = appName;
            return this;
        }

        withAppPort(appPort) {
            this.app.appPort = appPort;
            return this;
        }

        withAppDescription(appDescription) {
            this.app.appDescription = appDescription;
            return this;
        }

        withAuthor(author) {
            this.app.author = author;
            return this;
        }

        withVersion(version) {
            this.app.version = version;
            return this;
        }

        withRepository(repository) {
            this.app.repository = repository;
            return this;
        }

        withAuth(auth) {
            this.app.auth = auth;
            return this;
        }

        withCache(cache) {
            this.app.cache = cache;
            return this;
        }

        withDataBase(dataBase) {
            this.app.dataBase = dataBase;
            return this;
        }

        withEntities(entities) {
            this.app.entities = entities;
            return this;
        }


        withCreatedAt(createdAt) {

            this.app.createdAt = createdAt;

            return this;

        }

        withUpdatedAt(updatedAt) {

            this.app.updatedAt = updatedAt;

            return this;

        }

        build() {

            return this.app;

        }
    }
}

module.exports = { App }