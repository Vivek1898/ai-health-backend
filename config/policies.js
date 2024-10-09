/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    //for all the apis

    '*': ['IsAuthorized'],

    /* ======================= App Controller ================================================= */

    'apps/AppsController': {
        '*': true,
    },

    /* ======================= Staff Management Controller ================================================= */

    'staff/StaffManagementController': {
        '*': ['IsAuthorized', 'IsAdmin'],
        'staffList': ['IsAuthorized']
    },

    /* ======================= Staff Session Controller ================================================= */

    'staff/StaffSessionController': {
        '*': ['IsAuthorized'],
        'staffLogin': true,
        'validateResetKey': true,
        'resetPasswordKey': true,
        'createPasswordKey': true
    },

    /* ======================= User Management Controller ================================================= */

    'user/UserManagementController': {
        '*': true,
        'getUserProfile': ['IsAuthorized'],
        'updateUserProfile': ['IsAuthorized'],
    },

};
