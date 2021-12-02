const db = require('../../../config/db');
const {parse} = require("nodemon/lib/cli");

const conn = db.init();

exports.list = (req, res) => {
    //리스트 모듈
    // console.log(req.params);
    // console.log(req.query);
    // console.log(req.body)
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";
    let body = req.query;
    let id = "";
    if (body.keyword) where += ` AND subject like '%${body.keyword}%' `;
    sql = ` SELECT count(*) cnt
            FROM tb_board
            WHERE board_code = ? ${where} `;
    conn.query(sql, [body.board_code], (err, data) => {
        if (err) console.log(err);
        totalCount = data[0].cnt;
        total_page = Math.ceil(totalCount / ipp);
        if (body.page) page = body.page;
        start = (page - 1) * 10;
        start_page = Math.ceil(page / block);
        end_page = start_page * block;

        if (total_page < end_page) end_page = total_page;
        let paging = {
            "totalCount": totalCount,
            "total_page": total_page,
            "page": page,
            "start_page": start_page,
            "end_page": end_page,
            "ipp": ipp
        }

        sql = ` SELECT *
                FROM tb_board
                WHERE board_code = ? ${where}
                ORDER BY num DESC LIMIT ?, ? `;
        conn.query(sql, [body.board_code, start, end], (err, list) => {
            if (err) console.log(err);
            sql
            res.send({success: true, list: list, paging: paging});
        })
    })
}

exports.mod = (req, res) => {
    body = req.body;
    sql = " UPDATE tb_board SET subject = ?, cont = ?, editdate = now() WHERE num = ? ";
    conn.query(sql, [body.subject, body.cont, body.num], (err, result) => {
        if (err) console.log(err);
        res.send({success: true});
    })
}

exports.delete = (req, res) => {
    body = req.query;
    sql = " DELETE FROM tb_board WHERE num = ? ";
    conn.query(sql, [body.num], (err, result) => {
        if (err) console.log(err);
        res.send({success: true, result: result});
    })
}

exports.view = (req, res) => {
    body = req.query;
    num = req.params.num;
    sql = " SELECT * FROM tb_board WHERE board_code = ? AND num = ? ";

    conn.query(sql, [body.board_code, num], (err, view) => {
        if (err) console.log(err);
        sql = " SELECT level, id FROM login_id WHERE id = ?";
        conn.query(sql, (req.params.id), (err, log) => {
            if (err) console.log(err);
            res.send({success: true, view: view, user: log[0]});
        })
    });
    sql = " UPDATE tb_board SET views = views + 1 WHERE num = ?"
    conn.query(sql, [req.params.num]), (err, view) => {
        if (err) console.log(err);
    }
}

exports.add = (req, res) => { //등록 프로세스 모듈
    body = req.body; //전송된 데이터를 받는다.
    sql = " INSERT INTO  tb_board (board_code, subject, cont, id, name, regdate, views) values (?, ?, ?, ?, ?,now(), 0) ";
    conn.query(sql,
        [body.board_code, body.subject, body.cont, body.id, body.name],
        (err, result) => {
            if (err) console.log(err);

            res.send({success: true});
        })
}

exports.comment = (req, res) => {
    sql = " INSERT INTO comment (id, name, comment, regdate, num) values(?, ?, ?, now(), ?)";
    conn.query(sql, [req.body.id, req.body.name, req.body.comment, req.body.num], (err, log) => {
        if (err) console.log(err);
        res.send({ok: "ok"});
    })
}

exports.getcomment = (req, res) => {
    sql = " SELECT * FROM comment WHERE num = ? ORDER BY no";
    conn.query(sql, (req.params.num), (err, log) => {
        if (err) console.log(err);
        res.send({list: log});
    })
}

exports.del_comment = (req, res) => {
    sql = " DELETE FROM comment WHERE no = ?";
    conn.query(sql, (req.params.no), (err, log) => {
        if (err) console.log(err);
        res.send({del: "ok"})
    })
}

exports.update_comment = (req, res) => {
    sql = " UPDATE comment SET comment = ?, editdate = now() WHERE no = ?";
    conn.query(sql, [req.params.comment, req.params.no], (err, log) => {
        if (err) console.log(err);
        res.send({update: "ok"});
    })
}

exports.userlist = (req, res) => {
    sql = " SELECT * FROM login_id";
    conn.query(sql, (err, log) => {
        if (err) console.log(err);
        res.send({list: log})
    })
}