const AWS = require('aws-sdk');
const axios = require("axios");
const bucketName = sails.config.custom.awsBucketName
const awsAssetUrl = sails.config.custom.awsAssetUrl

const awsConfig = {
    accessKeyId: sails.config.custom.awsAccessKeyId,
    secretAccessKey: sails.config.custom.awsSecretAccessKey,
    region: sails.config.custom.awsRegion,
    apiVersion: sails.config.custom.awsApiVersion,
}

const S3 = new AWS.S3(awsConfig);

module.exports = {

    /**
     * Upload file to AWS S3.
     *
     * @param {object} request - request Uploaded File path
     */

    uploadFileToAWS: async (uploadedFiles, companyId) => {
        try {
            if (!uploadedFiles || !uploadedFiles.length) {
                return 'Empty File';
            }

            let filesArray = [];
            // loop through the uploaded files array
            for(const file of uploadedFiles) {

                const uploadedFile = file;
                // Create a readable stream from the file path
                const fileStream = require('fs').createReadStream(uploadedFile.fd);
                const type = uploadedFile.type.split("/")[1];

                // Creating a unique name for the file using the current timestamp
                const uniqueFileName = `${Date.now()}.${type}`;

                // Creating a path for the image
                const filePath = `asset_cid_${companyId}/${uniqueFileName}`;

                const params = {
                    Bucket: sails.config.custom.awsBucketName,
                    Key: filePath,
                    Body: fileStream,
                    ContentType: uploadedFile.type
                };

                const data = await S3.upload(params).promise();

                filesArray.push(data.Location);
            }

            return filesArray;
        } catch (e) {
            sails.log.error(e);
        }
    },

    /**
     * Delete file from AWS S3.
     *
     * @param {object} request - request Key
     * key = 'images/1700219585744.png';
     * @returns {Promise<void>}
     */

    removeFileFromAWS: async (key) => {
        try {
            const params = {
                Bucket: sails.config.custom.awsBucketName,
                Key: key,
            };

            // Send Remove request
            S3.deleteObject(params, (err, data) => {
                if (err) {
                    sails.log.error(err);

                } else {
                    sails.log.info(data);
                }
            });

        } catch (e) {
            sails.log.error(e);
        }
    },

    /**
     * Download File from Url and asset to AWS S3.
     *
     * @param {string} imageUrl - URL of the file to download and asset
     * @param {string} uniqueFileName - Unique key
     * @returns {Promise<{ key: string, url: string }>} - Key and custom generated URL of the uploaded file
     */
    downloadAndUploadFileToAWS: async (imageUrl, uniqueFileName) => {
        try {
            if (!imageUrl) {
                return null;
            }

            const params = {
                Bucket: bucketName,
                Key: `images/${uniqueFileName}`,
            };

            let urlCheck = imageUrl.split('/').shift();

            if (!(urlCheck === 'https:' || urlCheck === 'http:')) {
                imageUrl = 'https://' + imageUrl;
            }

            const response = await axios({
                method: 'get',
                url: imageUrl,
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'none',
                    'Sec-Fetch-User': '?1',
                    'Cache-Control': 'max-age=0',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            const contentType = response.headers['content-type'] || 'application/octet-stream';

            params.Body = response.data;
            params.ContentType = contentType;

            await S3.upload(params).promise();
            return `${awsAssetUrl}/${params.Key}`;

        } catch (e) {
            sails.log.error(e);
            return null;
        }
    }

}

