module.exports = function(passport, LocalStrategy, models, controllers) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        controllers.userController.findOne({_id : id}, function(err, user) {
            done(err, user);
        })
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log('success');
            controllers.userController.findOne({email : username, password : password}, function(err, user) {
                if ( err ) {
                    return done(err);
                }
                if ( !user ) {
                    console.log('user not found');
                    return done(null, false);
                }
                if ( user ) {
                    console.log('user found');
                    return done(null, user);
                }
            })
        }
    ))
};