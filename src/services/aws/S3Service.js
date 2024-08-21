/** 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

const {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
    CreateMultipartUploadRequestFilterSensitiveLog,
} = require("@aws-sdk/client-s3");

const DefaultException = require('../../models/exception/DefaultException');
const cache = require('../../utilities/CacheUtil');
const { isDebug } = require('../../utilities/Utilities');

const S3Service = () => {

    const region = (process.env.AWS_REGION || 'us-east-1');
    /**
     * Read the object as String.
     * @param {string} bucket 
     * @param {string} name 
     * @returns {string} string content
     */
    const getObjectAsString = async (bucket, name) => {
        try {
            const key = `s3-${bucket}-${name}`;
            let content = cache.get(key);

            if (!content) {
                if (isDebug())
                    console.log(`cache '${key}' not found, go to AWS S3`);
                const s3Client = new S3Client({ region: region });
                const { Body } = await s3Client.send(
                    new GetObjectCommand({
                        Bucket: bucket,
                        Key: name,
                    })
                );
                content = await Body.transformToString();
                cache.set(`s3-${bucket}-${name}`, content);

            }
            return {
                fileName: name,
                data: content
            };
        } catch (e) {
            console.error('Error: ', e);
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * Read the object as byte array.
     * @param {string} bucket 
     * @param {string} name 
     * @returns {Uint8Array} byte array content
     */
    const getObjectAsByteArray = async (bucket, name) => {
        try {
            const key = `s3-${bucket}-${name}`;
            let content = cache.get(key);

            if (!content) {
                if (isDebug())
                    console.log(`cache '${key}' not found, go to AWS S3`);
                const s3Client = new S3Client({ region: region });
                const { Body } = await s3Client.send(
                    new GetObjectCommand({
                        Bucket: bucket,
                        Key: name,
                    })
                );
                content = await Body.transformToByteArray();
                cache.set(key, Buffer.from(content))
            }
            return {
                fileName: name,
                data: content
            };
        } catch (e) {
            console.error('Error: ', e);
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    /**
     * put Object in S3
     * @param {*} bucket 
     * @param {*} name 
     * @param {*} content 
     */
    const putObject = async (bucket, name, content) => {
        try {
            const s3Client = new S3Client({ region: region });
            // Put an object into an Amazon S3 bucket.
            if (isDebug())
                console.log(`put '${name}' to AWS S3`);
            return await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Key: name,
                    Body: content,
                })
            );
        } catch (e) {
            console.error('Error: ', e);
            const excepcion = new DefaultException(e.message);
            throw excepcion;
        }
    }

    return {
        getObjectAsString,
        getObjectAsByteArray,
        putObject
    }
}

module.exports = S3Service;