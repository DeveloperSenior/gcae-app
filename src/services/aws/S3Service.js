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

const cache = require('../../utilities/CacheUtil');

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
                console.log(`cache '${key}' not found, go to AWS S3`);
                const s3Client = new S3Client({ region: region });
                const { Body } = await s3Client.send(
                    new GetObjectCommand({
                        Bucket: bucket,
                        Key: name,
                    })
                );
                content = await Body.transformToString();
                cache.set(`s3-${bucket}-${name}`, content)
            }
            return {
                fileName: name,
                data: content
            };
        } catch (e) {
            console.log('Error:', e);
        }
        return null;
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
            console.log('Error:', e);
        }
        return null;
    }

    return {
        getObjectAsString,
        getObjectAsByteArray
    }
}

module.exports = S3Service;