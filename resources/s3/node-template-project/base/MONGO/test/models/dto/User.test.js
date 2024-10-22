/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const { User } = require('../../../src/models/dto/User');
const moment = require('moment');
const { DATE_FORMAT } = require('../../../src/utilities/Constants');



/**
 * Mock user mongo document
 */
const userMock =
{
    _id: "1",
    userName: "testUser",
    bio: "Developer",
    avatar: "http://avatar/andres.png",
    email: "testUser@gmail.com",
    password: "JDJiJDEwJDVFTWVnQ0NvR0NKRGd0d2QvamVUc2UwUVkvak13VVEwRE9Wa1U4MXdzQ203Z0ZYZmhkMW11",
    createdAt: "2024-04-09"
}

describe("User DTO", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("Should been build User DTO", async () => {

        const currentDate = moment().format(DATE_FORMAT.DEFAULT);

        /**
         * Mock param User to create
         */
        const user = new User.Builder()
            .withEmail('testUser@gmail.com').withPassword("JDJiJDEwJDVFTWVnQ0NvR0NKRGd0d2QvamVUc2UwUVkvak13VVEwRE9Wa1U4MXdzQ203Z0ZYZmhkMW11")
            .withUserName('testUser').withBio('Developer').withAvatar('http://avatar/andres.png')
            .withId('1').withCreatedAt('2024-04-09').withUpdatedAt(currentDate).build();

        userMock.updatedAt = currentDate;

        expect(user).toEqual(userMock);
    });

});