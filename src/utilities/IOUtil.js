/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const fs = require('fs');
const DefaultException = require('../models/exception/DefaultException');
const decompress = require('decompress');
const { isDebug } = require('../utilities/Utilities');

/**
 * create recursive Folders 
 * @param {String} folderName 
 */
const createFolders = (folderName) => {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
        }
    } catch (e) {
        console.error('Error: ',e);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * create File in path with content
 * @param {String} path 
 * @param {Object} content 
 */
const createFile = (path, content) => {
    try {
        fs.writeFileSync(path, content);
        if (isDebug())
            console.info(`File '${path}' created successfully`);
    } catch (e) {
        console.error(`creation of file '${path}' failed: `, e);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * Unzip file to target
 * @param {String} path 
 * @param {String} target 
 * @param {Object} content
 */
const unzipFile = async (path, target) => {
    try {

        await decompress(path, target);
        if (isDebug())
            console.log('Unzip file done!');
        fs.rmSync(path);

    } catch (e) {
        console.error('Error: ', e);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * create File compress And Unzip
 * @param {String} path 
 * @param {String} target 
 * @param {Object} content
 */
const createFileAndUnzip = async (path, target, content) => {
    try {

        fs.writeFileSync(path, content);
        await decompress(path, target);
        if (isDebug())
            console.log('Unzip file done!');
        fs.rmSync(path);

    } catch (e) {
        console.error('Error: ', e);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * read File
 * @param {*} path 
 * @returns 
 */
const readFile = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (e) {
        console.error('Error: ', e);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * read Dir
 * @param {*} path 
 * @returns 
 */
const readDir = (path, _recursive = false, _withFileTypes = false) => {
    try {
        const data = fs.readdirSync(path, { withFileTypes: _withFileTypes, recursive: _recursive });
        return data;
    } catch (e) {
        console.error('Error: ',e);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * delete File
 * @param {*} path 
 */
const deleteFile = (path) => {
    fs.rmSync(path,{recursive: true});
}

/**
 * create Read Stream File
 * @param {*} file 
 * @returns 
 */
const createReadStreamFile = (file)=>{
    var fileStream = fs.createReadStream(file);
    fileStream.on("error", function (err) {
        console.log("File Error", err);
      });
    return fileStream;
}

module.exports = {
    createFolders,
    createFile,
    createFileAndUnzip,
    readFile,
    readDir,
    deleteFile,
    unzipFile,
    createReadStreamFile
}