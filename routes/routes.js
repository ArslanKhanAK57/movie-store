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

    /*
    * ########################################### AUTH ROUTES ###############################################
    * */

    router.get('/', function(req, res) {
        res.render('index');
    });

    router.get('/login', function(req, res) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local', {
        failureRedirect : '/login'
    }), function(req, res) {
        res.redirect('/dashboard');
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /*
    * ########################################### MOVIE ROUTES ###############################################
    * */

    router.get('/movies', secureRouts, function(req, res){
        controllers.movieController.findMovies(req.query.searchCriteria, req.query.searchString, function(movies){
            res.json(JSON.stringify(movies));
        });
    });

    router.post('/movies', secureRouts, function(req, res) {
        controllers.movieController.addNewMovie(req.body, function(){
            res.redirect('/dashboard');
        })
    });

    router.delete('/movies/:id', secureRouts, function(req, res) {
        controllers.movieController.removeMovieById(req.params.id, function() {
            res.redirect('/dashboard');
        });
    });

    router.put('/movies/:id', secureRouts, function(req, res) {
        controllers.movieController.editMovie({_id : req.params.id}, req.body, function(err, movie) {
            res.send();
        });
    });

    router.get('/movies/add', secureRouts, function(req, res) {
        res.render('admin/addmovie');
    });

    router.get('/movies/edit/:id', secureRouts, function(req, res) {
        controllers.movieController.findOne({_id : req.params.id}, function(err, movie) {
            res.render('admin/editmovie', {movie : movie});
        });
    });

    /*
    * ########################################### USER ROUTES ###############################################
    * */

    router.get('/signup', function(req, res) {
        res.render('signup');
    });

    router.post('/signup', function(req, res) {
        controllers.userController.signup(req.body, function(){
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