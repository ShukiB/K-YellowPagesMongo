var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/YellowPages');

var index = require('./routes/index');
var people = require('./routes/people');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'YP.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/controllers', express.static(__dirname + '/public/controllers'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/directives', express.static(__dirname + '/public/directives'));
app.use('/factories', express.static(__dirname + '/public/factories'));
app.use('/filters', express.static(__dirname + '/public/filters'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/views', express.static(__dirname + '/public/views'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/people', people);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.write('error');
});

module.exports = app;