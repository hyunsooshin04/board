const db = require('../../../config/db');

const conn = db.init();

exports.list = (req, res) => {
    conn.query("select * from tb_board", (err, row) => {
        if (err) throw err;
        res.send({success: true, data: row})
    })
}

exports.add = (req, res) => {
    body = req.body; //전송된 데이터를 받는다.
    sql = " INSERT INTO  tb_board (board_code, subject, cont, id, regdate) values (?, ?, ?, ?,now()) ";
    conn.query(sql,
        [body.board_code
            , body.subject
            , body.cont
            , body.id]
        , (err, result) => {
            if (err) throw err;

            res.send({success: true});
        })
}