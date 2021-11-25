// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index'); //router 설정파일 호출
// var usersRouter = require('./routes/users'); //router 설정파일 호출
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter); //앱에 설정한 라우터 모듈을 사용할 수 있게 적용
// app.use('/users', usersRouter); //앱에 설정한 라우터 모듈을 사용할 수 있게 적용
var express = require('express');
var app = express()
var api = require('./routes/index')
var db = require('./config/db'); //db 연결 모듈 호출
var cors = require('cors'); //교차통신 모듈 호출

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var conn = db.init();  //db 모듈 커넥션 실행
db.conn(conn); //db 연결 확인
app.use(cors())//교차통신 적용

app.use('/', api);

app.listen(3000, () => {
    console.log('listen t0 3000')
})