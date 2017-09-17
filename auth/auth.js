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
            controllers.userController.findOne({email : username, password : password}, function(err, user) {
                if ( err ) {
                    return done(err);
                }
                if ( !user ) {
                    return done(null, false);
                }
                if ( user ) {
                    return done(null, user);
                }
            })
        }
    ))
};