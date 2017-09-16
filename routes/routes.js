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

    router.get('/', function(req, res) {
        res.render('index');
    });

    router.get('/login', function(req, res) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local', {
        failureRedirect : '/login'
    }), function(req, res, next) {
        res.redirect('/dashboard');
    });

    router.get('/allmovies', secureRouts, function(req, res){
        controllers.movieController.findMovies({}, function(movies){
            res.json(JSON.stringify(movies));
        });
    });

    router.get('/addmovie', secureRouts, function(req, res) {
        res.render('admin/addmovie');
    });

    router.post('/addmovie', secureRouts, function(req, res) {
        controllers.movieController.addNewMovie(req.body, function(){
            res.redirect('/dashboard');
        })
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/signup', function(req, res) {
        res.render('signup');
    });

    router.post('/signup', function(req, res) {
        controllers.userController.signup(req.body, function(){
            console.log(req.body + 'asdfasdfasdasdfadsf');
            res.redirect('/login');
        })
    });

    router.get('/dashboard', secureRouts, function(req, res) {
        if ( req.user.role === 'ADMIN' ) {
            res.render('admin/dashboard');
        }
        else {
            res.render('customer/dashboard');
        }
    });

    app.use('/', router);
};