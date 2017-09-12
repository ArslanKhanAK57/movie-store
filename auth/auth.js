module.exports = function(passport, LocalStrategy, mongoose, config) {

    passport.use(new LocalStrategy({}))
};