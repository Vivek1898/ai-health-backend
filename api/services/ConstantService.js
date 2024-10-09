/*
* ConstantService js to store all constant values for this app
 */
module.exports = {
    pageLimit: '10',
    standardDateTime: 'YYYY-MM-DD HH:mm:ss',
    userDateTime: 'll',
    onlyDate: 'YYYY-MM-DD',
    USAOnlyDate: 'MM-DD-YYYY',
    monthYearDate: 'MMMM D, YYYY',
    onlyTime: 'HH:mm',
    standardTime: 'HH:mm:ss',
    customDateTime: 'MMM DD, YYYY, hh:mm a',
    defaultLocale: 'en-US',
    defaultCurrency: 'USD',
    currentCurrency: 'CAD',
    currentDir: process.cwd(),

    //usefull links
    createPasswordLink: `${sails.config.custom.dashboardBaseUrl}/auth/create-password?key=`,
    forgotPasswordLink: `${sails.config.custom.dashboardBaseUrl}/auth/reset-password?key=`,


    responseCode: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        INTERNAL_SERVER_ERROR: 500,
        FORBIDDEN: 403,
    },
    staffRole: {
        SUPER_ADMIN: 0
    },
    userType: {
        SUPER_ADMIN: 0,
        STAFF: 1,
    },
    userTypeTableName: {
        0: 'super_admin',
        1: 'staff'
    },

    pushSource: {
        ANDROID: 'ANDROID',
        IOS: 'IOS',
        WEB: 'WEB'
    },
    fulfillmentStatus: {
        UNFULFILLED: -1,
        FULFILLED: 0,
    },


    //staff access id prefix
    prefixAccessId: {
        admin: 'SA',
        staff: 'SS',
    },
    roleId: {
        admin: 0,
        staff: 1,
    },

    assetTypeMap: {
        'image/jpeg': 'image',
        'image/png': 'image',
        'video/mp4': 'video',
        'video/x-msvideo': 'video'
    },

    responseMessage: {

        //Staff Management Controller
        STAFF_EMAIL_ALREADY_REGISTERED: 'Staff\'s email already registered!',
        STAFF_CONTACT_NUMBER_ALREADY_REGISTERED: 'Staff contact number already registered!',
        STAFF_ADDED_SUCCESS: 'Staff has been added successfully.',
        ERR_MSG_ISSUE_IN_ADD_STAFF_API: 'Oops! Something went wrong in add staff api!',
        STAFF_NOT_FOUND: 'No staff found with this id! Is the staff deleted?',
        STAFF_EDIT_SUCCESS: 'Staff has been updated successfully.',
        STAFF_DELETE_SUCCESS: 'Staff has been deleted successfully.',
        STAFF_COLUMN_UPDATED: 'Staff columns for product list has been updated successfully.',
        PASSWORD_CHANGE_SUCCESS: 'Password has been changed successfully.',
        ERR_MSG_ISSUE_IN_RESET_PASSWORD_STAFF_API: 'Oops! Something went wrong in reset password staff api!',
        STAFF_LIST: 'Staff list',

        //Staff Session Controller
        ERR_MSG_WRONG_CREDENTIALS_API: 'Email or password is wrong.',
        LOG_IN_SUCCESS: "Logged in successfully!",
        ERR_MSG_ISSUE_IN_STAFF_LOGIN_API: 'Oops! Something went wrong in staff login api!',
        ERR_MSG_ISSUE_IN_STAFF_LOGOUT_API: 'Oops! Something went wrong in admin logout api!',
        LOG_OUT_SUCCESS: "You are logged out!",
        PASSWORD_RESET_KEY_NOT_VALID: "The password reset link is no longer valid. Please request another password reset email from the login page.",
        PASSWORD_CREATE_KEY_NOT_VALID: "The password create link is no longer valid. Please request a password reset email from the login page.",



        //User Management Controller
        USER_REGISTERED_SUCCESS: 'User has been registered successfully.',
        USER_EMAIL_ALREADY_REGISTERED : 'User email already registered!',
        USER_NOT_FOUND: 'No user found with this id! Is the user deleted?',
        PROFILE_UPDATE_SUCCESS: 'User profile has been updated successfully.',
        ERR_MSG_ISSUE_IN_UPDATE_PROFILE: 'Oops! Something went wrong in update profile api!',
        PROFILE_FETCH_SUCCESS: 'User profile fetched successfully.',

        ERR_MSG_NO_HEADER_AUTHORIZATION: 'No Authorization header was found!',
        ERR_MSG_INVALID_SESSION: 'You are not authorized to access this resource!',
        ERR_MSG_WRONG_FORMAT_AUTHORIZATION: 'Wrong format of Authorization header!',
        ERR_MSG_ISSUE_IN_FETCH_PROFILE: 'Oops! Something went wrong in fetch profile api!',
        ERR_MSG_ISSUE_IN_LOGIN_API: 'Oops! Something went wrong in login api!',
        LOGIN_SUCCESS: 'Logged in successfully!',
        INVALID_CREDENTIALS: 'Invalid request! Please provide valid credentials.',
        ERR_MSG_ISSUE_IN_SIGNUP_API: 'Oops! Something went wrong in signup api!',
    },
};
