var express = require('express');
var app = express();
var path = require('path');
var hoganExpress = require('hogan-express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config/config');
var ConnectMongo = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect(config.dbURL, {
    useMongoClient : true
});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('./models/models')(mongoose);
var controllers = require('./controllers/controllers')(models);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', hoganExpress);
app.set('view engine', 'html');

var env = process.env.NODE_ENV || 'development';
if ( env === 'production' ) {
    app.use(session({
        secret : config.sessionSecret,
        store : new ConnectMongo({
            url : config.dbURL,
            stringify : true
        })
    }));
}
else {
    app.use(session({
        secret : config.sessionSecret,
        resave : true,
        saveUninitialized : true
    }));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./auth/auth')(passport, LocalStrategy, models, controllers);
require('./routes/routes')(express, app, passport, controllers);

app.listen((process.env.PORT || 3000), function() {
    console.log('Movie store running on port: ' + (process.env.PORT || 3000));
    console.log('Environment: ' + env);
});