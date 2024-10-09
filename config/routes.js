/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'GET /': {controller: 'apps/AppsController', action: 'ping'},

    /* ======================== User Management  Controller ===================================================== */
    //User Signup
    'POST /user/signup': {controller: 'user/UserManagementController', action: 'signup'},
    //User Login
    'POST /user/login': {controller: 'user/UserManagementController', action: 'login'},
    // User Profile
    'GET /user/profile': {controller: 'user/UserManagementController', action: 'getUserProfile'},
    // Update User Profile
    'PATCH /user/update': {controller: 'user/UserManagementController', action: 'updateUserProfile'},





};
