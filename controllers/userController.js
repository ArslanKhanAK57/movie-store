

module.exports = function (user) {

    var signup = function(userToBeCreated, next) {
        console.log('in signup');
        var newUser = new user({
            email : userToBeCreated.email,
            password : userToBeCreated.password,
            role : userToBeCreated.role.toUpperCase(),
            address : userToBeCreated.address,
            name : userToBeCreated.name,
            status : 'ACTIVE',
            createdDate : new Date()
        });

        newUser.save(newUser, function(err) {
            next();
        });
    };

    var findOne = function(query, next) {
        user.findOne(query, function(err, user){
            next(err, user);
        });
    };

    return {
        signup : signup,
        findOne : findOne
    };

};