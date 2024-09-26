
const {FIELD_TYPE} = require('../../src/utilities/Constants');
describe("Constants", () => {


    it("Should convert OBJECT Field Type to SQL TEXT Field type", async () => {
        const intType = FIELD_TYPE('OBJECT');
        expect(intType).toBe('TEXT');
    });

    it("Should convert STRING Field Type to SQL VARCHAR Field type", async () => {
        const intType = FIELD_TYPE('STRING');
        expect(intType).toBe('VARCHAR');
    });

    it("Should convert NUMBER Field Type to SQL NUMERIC Field type", async () => {
        const intType = FIELD_TYPE('NUMBER');
        expect(intType).toBe('NUMERIC');
    });

    it("Should convert DATE Field Type to SQL DATE Field type", async () => {
        const intType = FIELD_TYPE('DATE');
        expect(intType).toBe('DATE');
    });

    it("Should convert RELATION Field Type to SQL INT4 Field type", async () => {
        const intType = FIELD_TYPE('RELATION');
        expect(intType).toBe('INT4');
    });

});