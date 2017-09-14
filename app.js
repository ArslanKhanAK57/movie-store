var express = require('express');
var app = express();
var path = require('path');
var hoganExpress = require('hogan-express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/config.js');
var ConnectMongo = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect(config.dbURL, {
    useMongoClient : true
});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('./models/models.js')(mongoose);

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
        "secret" : config.sessionSecret
    }));
}

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./auth/auth.js')(passport, LocalStrategy, models);
require('./routes/routes.js')(express, app, passport, models);

app.listen((process.env.PORT || 3000), function() {
    console.log('Movie store running on port: ' + (process.env.PORT || 3000));
    console.log('Environment: ' + env);
});