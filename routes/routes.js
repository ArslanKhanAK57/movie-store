module.exports = function(express, app, passport) {

    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('index');
    })
};