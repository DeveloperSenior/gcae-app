
describe("Cache Util", () => {

    it("could reach cache with default TTL", async () => {

        process.env.CACHE_TTL = 3600;
        const cache = require('../../src/utilities/CacheUtil');
        expect(cache).toBeDefined();
    });

});