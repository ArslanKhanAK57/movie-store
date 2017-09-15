module.exports = function(express, app, passport, models) {

    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('index');
    });

    router.get('/login', function(req, res, next) {
        res.render('login')
    });

    // router.post('/login', passport.authenticate('local', {
    //     failureRedirect : '/login'
    // }), function(req, res, next) {
    //     res.redirect('/');
    // });

    router.post('/login', function(req, res, next) {
        models.user.findOne({email : 'arslan'}, function(err, user) {
            console.log('err' + err);
            console.log('user' + user);
            // if ( err ) {
            //     return done(err);
            // }
            // if ( !user ) {
            //     return done(null, false);
            // }
            // if ( user ) {
            //     return done(null, user);
            // }
            res.redirect('/');
        })
    });

    app.use('/', router);
};