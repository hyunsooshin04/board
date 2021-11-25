const db = require('../../../config/db'); //db설정 호출
const conn =  db.init(); //db 연결

exports.list = (req,res) => { //리스트 모듈 router 에서 호출
    conn.query("select * from tb_board",(err,row) => { //쿼리 실행
        console.log("쿼리 실행")
        if(err) throw err;
        res.send({success:true,data:row})
    })
}
// var express    =  require("express");
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'toor',
//     database : 'board'
// });
// var app = express();
//
// connection.connect(function(err){
//     if(!err) {
//         console.log("Database is connected ... \n\n");
//     } else {
//         console.log("Error connecting database ... \n\n");
//     }
// });
//
// app.get("/",function(request,response){
//     connection.query('SELECT * from tb_board', function(err, rows, fields) {
//         connection.end();
//         if (!err){
//             response.send(rows);
//             console.log('The solution is: ', rows);
//         }
//         else
//             console.log('Error while performing Query.');
//     });
// });
// app.listen(3000);