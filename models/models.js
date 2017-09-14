

module.exports = function(mongoose){

    var models = {};
    models.user = require('./user.js')(mongoose);

    return models;

};