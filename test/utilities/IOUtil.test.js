const { createFolders,
    createFile,
    createFileAndUnzip,
    readFile,
    readDir,
    deleteFile } = require('../../src/utilities/IOUtil');
const fs = require('fs');
const decompress = require('decompress');
const DefaultException = require('../../src/models/exception/DefaultException');

jest.mock('../../src/utilities/Utilities');
jest.mock('fs');
jest.mock('decompress');

describe("IOUtil Utility", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
        const utilities = require('../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => true);
    });

    it('should create a new log directory if one doesn\'t already exist', () => {
        // set up existsSync to meet the `if` condition
        fs.existsSync.mockReturnValue(false);
        // set up mkdirSync
        fs.mkdirSync.mockReturnValue(false);
        createFolders('mockFolder');
        // make your assertion
        expect(fs.existsSync).toHaveBeenCalled();
        expect(fs.mkdirSync).toHaveBeenCalled();
    });

    it('should exception to create a new log directory if one doesn\'t already exist', () => {
        // set up existsSync to meet the `if` condition
        fs.existsSync.mockReturnValue(false);
        // set up mkdirSync
        fs.mkdirSync.mockImplementation(() => { throw { message: 'Mock mkdirSync Error' } });
        try {
            createFolders('mockFolder');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toBe('Mock mkdirSync Error');
        }
    });

    it('should not create a new log directory if one does already exist', () => {
        // set up existsSync to meet the `if` condition
        fs.existsSync.mockReturnValue(true);
        createFolders('mockFolder');
    });

    it('should create a new file in directory', () => {
        // set up mkdirSync
        fs.writeFileSync.mockImplementation(()=>{});
        createFile('path','mockFolder');
        // make your assertion
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('should create a new file in directory without debug', () => {
        const utilities = require('../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => false);
        // set up mkdirSync
        fs.writeFileSync.mockImplementation(()=>{});
        createFile('path','mockFolder');
        // make your assertion
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('should exeption create a new file in directory', () => {
        // set up mkdirSync
        fs.writeFileSync.mockImplementation(()=>{throw { message: 'Mock writeFileSync Error' } });
        try {
            createFile('path','mockFolder');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toBe('Mock writeFileSync Error');
        }
    });

    it('should create a new file and unzip in directory', async () => {

        // set up unZip
        decompress.mockReturnValue(true);
        // set up mkdirSync
        fs.writeFileSync.mockImplementation(()=>{});
        fs.rmSync.mockImplementation(()=>{});
        await createFileAndUnzip('mockPath','mockFolder','mockContent');
        // make your assertion
        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(decompress).toHaveBeenCalled();
        expect(fs.rmSync).toHaveBeenCalled();
    });

    it('should create a new file and Zip in directory without debug', async () => {

        const utilities = require('../../src/utilities/Utilities');
        utilities.isDebug.mockImplementation(() => false);

        // set up unZip
        decompress.mockReturnValue(true);
        // set up mkdirSync
        fs.writeFileSync.mockImplementation(()=>{});
        fs.rmSync.mockImplementation(()=>{});
        await createFileAndUnzip('mockPath','mockFolder','mockContent');
        // make your assertion
        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(decompress).toHaveBeenCalled();
        expect(fs.rmSync).toHaveBeenCalled();
    });

    it('should exeption create a new file in directory', async () => {
        // set up mkdirSync
        fs.writeFileSync.mockImplementation(()=>{throw { message: 'Mock writeFileSync Error' } });
        try {
          await createFileAndUnzip('mockPath','mockFolder','mockContent');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toBe('Mock writeFileSync Error');
        }
    });

    it('should read a file in directory', () => {
        // set up mkdirSync
        fs.readFileSync.mockImplementation(()=>{});
        readFile('mockPath');
        // make your assertion
        expect(fs.readFileSync).toHaveBeenCalled();
    });

    it('should exeption read new file in directory', () => {
        // set up mkdirSync
        fs.readFileSync.mockImplementation(()=>{throw { message: 'Mock readFileSync Error' } });
        try {
            readFile('mockPath');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toBe('Mock readFileSync Error');
        }
    });

    it('should read a directory', () => {
        // set up mkdirSync
        fs.readdirSync.mockImplementation(()=>{});
        readDir('mockPath');
        // make your assertion
        expect(fs.readdirSync).toHaveBeenCalled();
    });

    it('should read a directory Recursive and File Types', () => {
        // set up mkdirSync
        fs.readdirSync.mockImplementation(()=>{});
        readDir('mockPath',true, true);
        // make your assertion
        expect(fs.readdirSync).toHaveBeenCalled();
    });

    it('should exeption read a directory', () => {
        // set up mkdirSync
        fs.readdirSync.mockImplementation(()=>{throw { message: 'Mock readdirSync Error' } });
        try {
            readDir('mockPath');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toBe('Mock readdirSync Error');
        }
    });

    it('should delte a file', () => {
        // set up mkdirSync
        fs.rmSync.mockImplementation(()=>{});
        deleteFile('mockPath');
        // make your assertion
        expect(fs.rmSync).toHaveBeenCalled();
    });

});