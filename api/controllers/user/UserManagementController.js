const Joi = require('joi');
const Moment = require('moment');


module.exports = {

    /**
     * Register a new user.
     * API Endpoint : /signup
     * API Method   :   POST
     */
    signup: async (req, res) => {
        try {
            sails.log.info('====================== USER SIGNUP REQUEST ==============================\n');
            sails.log.info('REQ BODY :', req.body);

            let userRequest = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
            };


            const schema = Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                phoneNumber: Joi.string().required(),
                dateOfBirth: Joi.string().optional(),
                gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
            });

            const validateResult = schema.validate(userRequest);

            if (validateResult.error) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: validateResult.error.message,
                });
            }

            const isEmailAlreadyRegistered = await Users.count({
                email: userRequest.email,
            });

            if (isEmailAlreadyRegistered > 0) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.USER_EMAIL_ALREADY_REGISTERED,
                });
            }

            const hashPassword = await BCryptService.encryptedPassword(userRequest.password);

            const user = await Users.create({
                name: userRequest.name,
                email: userRequest.email,
                phoneNumber: userRequest.phoneNumber,
                password: hashPassword,
                dateOfBirth: userRequest.dateOfBirth,
                gender: userRequest.gender,
                healthScore: 0
            }).fetch();

            sails.log.info('User Created Successfully:', user);

            // Send Welcome Email to the user
            // let subject = `Welcome to Our Service!`;
            // let content = `Hello ${userRequest.name}, Welcome! Your account has been successfully created.`;
            // MailService.sendEmailToUser(userRequest.email, subject, content);

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.USER_REGISTERED_SUCCESS,
                data: {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                }
            });

        } catch (exception) {
            sails.log.error(exception);
            return ResponseService.jsonResponse(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_SIGNUP_API);
        }
    },

    /**
     * Login user and return JWT.
     * API Endpoint :   /login
     * API Method   :   POST
     */
    login: async (req, res) => {
        try {
            sails.log.info('====================== USER LOGIN REQUEST ==============================\n');
            sails.log.info('REQ BODY :', req.body);

            const loginRequest = {
                email: req.body.email,
                password: req.body.password,
            };

            const schema = Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });

            const validateResult = schema.validate(loginRequest);

            if (validateResult.error) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: validateResult.error.message,
                });
            }

            const user = await Users.findOne({email: loginRequest.email});

            if (!user) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.USER_NOT_FOUND,
                });
            }

            const isValidPassword = await BCryptService.isSamePassword(loginRequest.password, user.password);

            if (!isValidPassword) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.INVALID_CREDENTIALS,
                });
            }

            const payload = {
                userId: user.id,
                email: user.email,
            }
            const token = await JwtService.generateToken(payload);

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.LOGIN_SUCCESS,
                data: {token},
            });

        } catch (exception) {
            sails.log.error(exception);
            return ResponseService.jsonResponse(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_LOGIN_API);
        }
    },

    /**
     * Retrieve user profile and health score.
     * API Endpoint :   /user
     * API Method   :   GET
     */
    getUserProfile: async (req, res) => {
        try {
            sails.log.info('====================== GET USER PROFILE REQUEST ==============================\n');
            const userId = req.sessionData.userId;

            const user = await Users.findOne({id: userId});

            if (!user) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.NOT_FOUND, {
                    message: ConstantService.responseMessage.USER_NOT_FOUND,
                });
            }

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.PROFILE_FETCH_SUCCESS,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    healthScore: user.healthScore,
                },
            });

        } catch (exception) {
            sails.log.error(exception);
            return ResponseService.jsonResponse(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_FETCH_PROFILE);
        }
    },

    /**
     * Update user information.
     * API Endpoint :   /user/update
     * API Method   :   PATCH
     */
    updateUserProfile: async (req, res) => {
        try {
            sails.log.info('====================== UPDATE USER PROFILE REQUEST ==============================\n');
            const userId = req.sessionData.userId;

            const updateRequest = {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,

            };

            const schema = Joi.object().keys({
                name: Joi.string().optional(),
                phoneNumber: Joi.string().optional(),
            });

            const validateResult = schema.validate(updateRequest);

            if (validateResult.error) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: validateResult.error.message,
                });
            }

            const updatedUser = await Users.updateOne({id: userId}).set(updateRequest);

            if (!updatedUser) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.NOT_FOUND, {
                    message: ConstantService.responseMessage.USER_NOT_FOUND,
                });
            }

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.PROFILE_UPDATE_SUCCESS,
                data: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phoneNumber: updatedUser.phoneNumber,
                    gender: updatedUser.gender,
                },
            });

        } catch (exception) {
            sails.log.error(exception);
            return ResponseService.jsonResponse(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_UPDATE_PROFILE);
        }
    },
};
