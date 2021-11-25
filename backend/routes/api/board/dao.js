const db = require('../../../config/db'); //db설정 호출
const conn =  db.init(); //db 연결

exports.list = (req,res) => { //리스트 모듈 router 에서 호출
    conn.query("select * from tb_board",(err,row) => { //쿼리 실행
        if(err) throw err;
        res.send({success:true,data:row});
    })
}