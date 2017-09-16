

module.exports = function(models){

    var controllers = {};

    controllers.userController = require('./userController')(models.user);

    return controllers;

};