// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var db = require('./config/db'); //db 연결 모듈 호출


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

var conn = db.init();  //db 모듈 커넥션 실행
db.conn(conn); //db 연결 확인