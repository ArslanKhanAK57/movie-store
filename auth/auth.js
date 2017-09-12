module.exports = function(passport, LocalStrategy, mongoose, config, models) {

    passport.use(new LocalStrategy(
        function(username, password, done) {

        }
    ))
};