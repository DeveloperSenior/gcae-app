const {getSession, isDebug} = require('../../src/utilities/Utilities');
const httpMock = require('node-mocks-http');
const DefaultException = require('../../src/models/exception/DefaultException');



describe("Utilities", () => {

    it("should return null get Session", async () => {
        const mockRequest = httpMock.createRequest({
            headers: {}
        });
        const response = getSession(mockRequest);
        expect(response).toBeNull();
    });

    it("should return exception to call getSession", async () => {
        const mockRequest = httpMock.createRequest({
            headers: {Authorization:'esto genera error'}
        });
        try{
         getSession(mockRequest);
        }catch(error){
            expect(error).toBeInstanceOf(DefaultException);
        }
        
    });

    it("should return true to call isDebug", async () => {
        const response = isDebug();
        expect(response).toBe(true);
    });


});