/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { App } = require('../../../src/models/dto/App');
const moment = require('moment');
const { DATE_FORMAT } = require('../../../src/utilities/Constants');



/**
 * Mock app mongo document
 */
const appMock =
{
    "_id": "1",
    "appName": "Mock",
    "appPort": 3001,
    "appDescription": "tester Mock",
    "author": "tester",
    "company": "Dev S.A",
    "version": "1.0",
    "repository": {
        "type": "git",
        "url": "https://github.com/DeveloperSenior/discover.git"
    },
    "auth": {
        "jwtSecretKey": "VEVTVC1HRU5FUkFUT1I="
    },
    "cache": {
        "ttl": 3600
    },
    "dataBase": {
        "type": "MONGO",
        "serviceName": "example-app",
        "host": "localhost",
        "port": "27017",
        "protocol": "mongodb",
        "user": "example-app-user",
        "pass": "SkZBZHYwOTlFc0VXckY5dg=="
    },
    "entities": [
        {
            "name": "Person",
            "description": "Some description",
            "fields": [
                {
                    "name": "dni",
                    "type": "String",
                    "pk": true,
                    "required": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "lastName",
                    "type": "String",
                    "required": true
                }
            ]
        },
        {
            "name": "Car",
            "description": "Some description",
            "fields": [
                {
                    "name": "colors",
                    "type": "array",
                    "items": {
                        "type": "Object",
                        "ref": "Color"
                    },
                    "pk": true,
                    "required": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "required": false
                },
                {
                    "name": "Engine",
                    "type": "array",
                    "items": {
                        "type": "String",
                        "ref": null
                    },
                    "required": true
                }
            ]
        }
    ]
}

describe("App DTO", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("Should been build App DTO", async () => {

        const currentDate = moment().format(DATE_FORMAT.DEFAULT);

        /**
         * Mock param User to create
         */
        const app = new App.Builder()
            .withId('1')
            .withUser('1')
            .withAppName('Mock')
            .withAppDescription('Tester mock')
            .withAppPort(3001)
            .withAuth({})
            .withAuthor('tester')
            .withCache({})
            .withDataBase({})
            .withEntities([])
            .withRepository({})
            .withState('A')
            .withCreatedAt('2024-04-09').withUpdatedAt(currentDate).build();

        appMock.updatedAt = currentDate;

        expect(app.author).toEqual(appMock.author);
        expect(app.appPort).toEqual(appMock.appPort);
        expect(app.appName).toEqual(appMock.appName);
    });

});