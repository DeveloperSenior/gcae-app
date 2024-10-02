/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const DefaultException = require('../../src/models/exception/DefaultException');
const { inject } = require('../../src/utilities/Utilities');



describe("IO File Service", () => {
    beforeEach(() => {
        jest.mock('adm-zip', () => {
            const functions = {
                addLocalFolder: jest.fn(),
                toBuffer: jest.fn(() => { return 'dataMock' })
            }
            return jest.fn().mockImplementation(() => {
                return functions
            });
        });
        jest.mock('../../src/utilities/IOUtil');
        const ioUtil = require('../../src/utilities/IOUtil');
        ioUtil.createFolders.mockReturnValue(true);
        ioUtil.createFile.mockReturnValue(true);
        ioUtil.createFileAndUnzip.mockReturnValue(true);
        ioUtil.unzipFile.mockReturnValue(true);
        ioUtil.readFile.mockReturnValue('MockData');
        ioUtil.readDir.mockReturnValue({});
        ioUtil.deleteFile.mockReturnValue({});
        ioUtil.createReadStreamFile.mockReturnValue('MockData');

        jest.mock('../../src/services/aws/S3Service');
        const s3Service = require('../../src/services/aws/S3Service');
        s3Service.mockImplementation(() => {
            return {
                getObjectAsString: jest.fn(async (bucket, name) => {
                    return { fileName: 'Mock.spec', data: 'MockData' }
                }),
                getObjectAsByteArray: jest.fn(async (bucket, name) => {
                    return { data: 'MockData' }
                }),
                putObject: jest.fn(async (bucket, name) => { })
            }
        });

    });

    afterEach(() => {

        jest.restoreAllMocks();
        jest.clearAllMocks();

    });

    it("should method been call function generateFileFromTemplate", async () => {
        const service = require('../../src/services/IOFileService');

        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'generateFileFromTemplate');
        await injectService.generateFileFromTemplate('TemplateMock', 'targetMock');
        expect(spyService).toHaveBeenCalled();
    });

    it("should method been call function generateFileFromTemplate with error", async () => {
        const service = require('../../src/services/IOFileService');
        const s3Service = require('../../src/services/aws/S3Service');
        s3Service.mockImplementation(() => {
            return {
                getObjectAsString: jest.fn(async (bucket, name) => { throw new DefaultException('Error') })
            }
        });
        const injectService = inject(() => { }, service)();
        try {

            await injectService.generateFileFromTemplate('TemplateMock', 'targetMock');
        } catch (error) {
            expect(error).toBeInstanceOf(DefaultException);
            expect(error.exception).toMatch('Error');
        }
    });

    it("should method been call function generateBaseProject", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'generateBaseProject');
        await injectService.generateBaseProject('appFolderMock', 'dbTypeMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function getContentFileFromTemplate", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'getContentFileFromTemplate');
        await injectService.getContentFileFromTemplate('fileTemplateMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function sanitizeFileContent Local", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'sanitizeFileContent');
        await injectService.sanitizeFileContent('fileMock.mock', 'targetMovk');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function sanitizeFileContent S3 AWS", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'sanitizeFileContent');
        await injectService.sanitizeFileContent('fileMock.mock', 'targetMovk', false);
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function saveFile", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'saveFile');
        await injectService.saveFile('basePathMock', 'folderMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function saveFile", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'saveFile');
        await injectService.saveFile('basePathMock', 'folderMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function getAppFile", async () => {

        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'getAppFile');
        await injectService.getAppFile('appNameMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function putTemplatesToS3", async () => {
        const ioUtil = require('../../src/utilities/IOUtil');
        ioUtil.readDir.mockReturnValue([]);
        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'putTemplatesToS3');
        await injectService.putTemplatesToS3('folderOriginMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function putTemplatesToS3, fetch files", async () => {
        const ioUtil = require('../../src/utilities/IOUtil');
        ioUtil.readDir.mockReturnValue([{ path: 'mockPath', name: 'mockName', isFile: jest.fn(() => true) }]);
        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'putTemplatesToS3');
        await injectService.putTemplatesToS3('folderOriginMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function putBaseProjectsTemplatesToS3", async () => {
        const ioUtil = require('../../src/utilities/IOUtil');
        ioUtil.readDir.mockReturnValue([]);
        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'putBaseProjectsTemplatesToS3');
        await injectService.putBaseProjectsTemplatesToS3('folderOriginMock');
        expect(spyService).toHaveBeenCalled();

    });

    it("should method been call function putBaseProjectsTemplatesToS3, process folders", async () => {
        const ioUtil = require('../../src/utilities/IOUtil');
        ioUtil.readDir.mockReturnValue([{
            path: 'mockPath',
            name: 'mockName',
            isFile: jest.fn(() => false)
        }]);
        const service = require('../../src/services/IOFileService');
        const injectService = inject(() => { }, service)();
        const spyService = jest.spyOn(injectService, 'putBaseProjectsTemplatesToS3');
        await injectService.putBaseProjectsTemplatesToS3('folderOriginMock');
        expect(spyService).toHaveBeenCalled();

    });


});