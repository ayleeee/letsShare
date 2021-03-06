var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
var bodyPaser=require("body-parser");
var session = require("express-session");
var FileStore=require("session-file-store")(session);
var fs = require("fs");

require("dotenv/config");

var filesRouter = require('./routes/fileService');
var downloadRouter = require('./routes/download');
var viewRouter=require("./routes/viewer");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', filesRouter);
app.use('/downloads',downloadRouter);
app.use('/view',viewRouter);

mongoose.connect(process.env.MONGODB_URL ,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log("Database Connection is ready");
}).catch((err)=>{
  console.log(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
