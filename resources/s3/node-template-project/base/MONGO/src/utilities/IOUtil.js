/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const fs = require('node:fs');
const DefaultException = require('../models/exception/DefaultException');
const decompress = require('decompress');


const createFolders = (folderName) => {
    try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
    } catch (e) {
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

const createFile = (path,content) => {
    try {
        fs.writeFile(path, content, err => {
            if (err) {
                console.log(`creation of file '${path}' failed`);
                throw err;
            } else {
              // file written successfully
              console.log(`File '${path}' created successfully`);
            }
          });
    } catch (e) {
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}

const createFileAndUnzip = (path,target,content) => {
    try {
        fs.writeFileSync(path, content);

        decompress(path, target).then(files => {
            console.log('done!');
            fs.rmSync(path);
        });

    } catch (e) {
        const excepcion = new DefaultException(e.message);
        throw excepcion;
    }
}


module.exports = {createFolders, createFile, createFileAndUnzip}