module.exports = function(express, app, passport, controllers) {

    var router = express.Router();

    var secureRouts = function(req, res, next) {
        if ( req.isAuthenticated() ) {
            next();
        }
        else {
            res.redirect('/');
        }
    };

    router.get('/', function(req, res, next) {
        res.render('index');
    });

    router.get('/login', function(req, res, next) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local', {
        failureRedirect : '/login'
    }), function(req, res, next) {
        res.redirect('/dashboard');
    });

    router.get('/signup', function(req, res, next) {
        res.render('signup');
    });

    router.post('/signup', controllers.userController.signup, function(req, res, next) {
        console.log(req.body + 'asdfasdfasdasdfadsf');
        res.redirect('/login');
    });

    router.get('/dashboard', secureRouts, function(req, res, next) {
        if ( req.user.role === 'ADMIN' ) {
            res.render('admin/dashboard');
        }
        else {
            res.render('customer/dashboard');
        }
    });

    app.use('/', router);
};