const Jwt = require('jsonwebtoken');
const JwtSecret = sails.config.session.secret;

module.exports = {

    /**
     * Issue new access token ( and refresh token if not attendant).
     *
     * @param id - Id of user
     * @param accessId - Access Id of user
     * @param role - Type of user
     * @param companyId - company Id of user
     * @param companyName - company name of user
     * @returns {Promise<void>}
     */
    issueNewAccessToken: async (id, accessId, role, companyId, companyName) => {
        let payload = {
            id: id,
            accessId: accessId,
            role: role,
            companyId: companyId,
            companyName: companyName
        };

        let jwtResponse = {};
        jwtResponse.accessToken = Jwt.sign(payload, JwtSecret);
        payload.token = jwtResponse.accessToken;
        return jwtResponse;
    },

    /**
     * Generate a JWT access token for the user.
     *
     * @param {Object} user - The user object containing necessary details.
     * @param {String} user.userId - The user's ID.
     * @param {String} user.email - The user's email.
     * @returns {Promise<Object>}    JWT Token and additional information.
     */
    generateToken: async (user) => {
        // Define the payload for the token
        let payload = {
            userId: user.userId,
            email: user.email,
        };

        // Set token expiration time (e.g., 1 hour)
        let options = {
            expiresIn: '1h'
        };

        try {
            // Sign the token using the secret
            const token = Jwt.sign(payload, JwtSecret, options);

            return {
                accessToken: token,
                expiresIn: options.expiresIn,
            };
        } catch (error) {
            sails.log.error('Error generating JWT token:', error);
            throw new Error('Error generating access token');
        }
    },


    /**
     * Verify token.
     *
     * @param token - JWT Token to be verified
     */
    verify: async (token) => {
        try {
            let decoded = await Jwt.verify(token, JwtSecret);
            return decoded
        } catch (exception) {
            sails.log.error(exception);
            return null;
        }
    },
};
