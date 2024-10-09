const crypto = require('crypto');
const ecnryption_method = 'aes-256-cbc';
const secret_key = '168d6528897fdd18f2e37267474ims';
const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 16)

module.exports = {

    /**
     * Generate secret key For users
     *
     * @returns string - secretKey
     */
    generateSecretKey: async (id, userName, data) => {

        const uniqueId = crypto.randomBytes(8).toString('hex');
        const dataToHash = `${userName}-${uniqueId}`;
        const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
        const secretKey = hash.slice(0, 32)
        await RedisService.setData(secretKey, data, (24 * 8 * 3600 * 1000));
        // await Staff.update({id: id}, {
        //     secretKey: secretKey
        // })
        return secretKey;

    }

}
