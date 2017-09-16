

module.exports = function(mongoose){

    var models = {};

    models.user = require('./user')(mongoose);
    models.customer = require('./customer')(mongoose);
    models.movie = require('./movie')(mongoose);
    models.audit = require('./audit')(mongoose);

    return models;

};