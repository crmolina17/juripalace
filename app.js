/**
 * Define global variables on namespace PER
 * for avoid colitions with others global variables.
 */
global.PER = {};

require('dotenv').config();

/**
 * Add more modules that dependent of config.
 */
PER.config = require('./config');
PER.helper = require('./util/helper');
/** PER.emailjs = require('./util/emailjs'); */
PER.validate = require('./util/validate');
/** PER.model = require('./db/model'); */
PER.log = require('./util/winston');


/**
 * Require modules.
 */
var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var path = require('path');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var i18n = require("i18n-express");
var geolang = require("geolang-express");
var flash = require('req-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

/**
 * Add main middlewares.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_WORD,
  maxAge: parseInt(process.env.SESSION_AGE, 10),
  httpOnly: process.env.SESSION_ONLY_HTTP
}))

/**
 * Add middlewares for flash messages.
 */
app.use(flash({
  locals: 'flash'
}));

/**
 * Add middlewares for i18n.
 */
app.use(geolang({
  siteLangs: ["en", "es"]
}));

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["en", "es"],
  textsVarName: 'translation'
}));

/**
 * Add middlewares for handle route.
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
