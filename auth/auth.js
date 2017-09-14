module.exports = function(passport, LocalStrategy, models) {

    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log('success');
            models.user.findByEmail(username, function(err, user) {
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