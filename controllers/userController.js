var userModel = require('../models/user.js');

exports.findByEmail = function(email) {
    userModel.findByEmail({
        email : email
    }, function(err, result) {
        console.log('success');
    })
};