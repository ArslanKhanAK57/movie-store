

module.exports = function(models){

    var controllers = {};

    controllers.userController = require('./userController')(models.user);
    controllers.movieController = require('./movieController')(models.movie);

    return controllers;

};