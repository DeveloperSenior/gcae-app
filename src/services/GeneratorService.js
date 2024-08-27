/**
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { App } = require("../models/dto/App");
const { User } = require("../models/dto/User");
const moment = require('moment');
const { DATE_FORMAT } = require('../utilities/Constants');

/**
 * Generator Service
 * @param {*} generatorRepository 
 * @returns 
 */
const GeneratorService = generatorRepository => {

    /**
     * create App
     * @param {App} app 
     * @param {User} userSession 
     * @returns 
     */
    const createApp = async (app, userSession) => {

        const { userId } = userSession;
        const { appName, appPort, appDescription, author, version, repository,
            cache, dataBase, entities, } = app;
        const currentDate = moment().format(DATE_FORMAT.DEFAULT);
        const appBuilder = new App.Builder()
            .withUser(userId)
            .withAppName(appName)
            .withAppPort(appPort)
            .withAppDescription(appDescription)
            .withAuthor(author)
            .withVersion(version)
            .withRepository(repository)
            .withCache(cache)
            .withDataBase(dataBase)
            .withEntities(entities)
            .build();
        
        const appFind = await generatorRepository.getAppByName(appBuilder.appName, userId);

        if (appFind) {
            appBuilder.updatedAt = currentDate;
            return generatorRepository.updateApp(appFind._id,userId,appBuilder);
        }else{
            appBuilder.createdAt = currentDate;
           return await generatorRepository.createApp(appBuilder);
        }

    }

    return {
        createApp
    }
}

module.exports = GeneratorService;