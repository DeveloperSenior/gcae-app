/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const fs = require('node:fs');
const DefaultException = require('../models/exception/DefaultException');
const decompress = require('decompress');

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
        console.info(`File '${path}' created successfully`);
    } catch (e) {
        console.error(`creation of file '${path}' failed`);
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * create File compress And Unzip
 * @param {String} path 
 * @param {String} target 
 * @param {Object} content 
 * @param {*} callBack CallBack function to start when the function over
 */
const createFileAndUnzip = async (path, target, content, callBack) => {
    try {

        fs.writeFileSync(path, content);
        decompress(path, target).then(files => {
            console.log('Unzip file done!');
            fs.rmSync(path);
            callBack(files);
        }).catch(error=> {
            console.log('Unzip file Error:',error);
            throw error;
        });

    } catch (e) {
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
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

/**
 * delete File
 * @param {*} path 
 */
const deleteFile = (path) =>{
    fs.rmSync(path);
}


module.exports = { createFolders, createFile, createFileAndUnzip, readFile, deleteFile }