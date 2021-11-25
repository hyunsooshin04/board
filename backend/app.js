var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //router 설정파일 호출
// var usersRouter = require('./routes/users'); //router 설정파일 호출

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //앱에 설정한 라우터 모듈을 사용할 수 있게 적용
// app.use('/users', usersRouter); //앱에 설정한 라우터 모듈을 사용할 수 있게 적용