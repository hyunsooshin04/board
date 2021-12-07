const db = require('../../../config/db');
const {parse} = require("nodemon/lib/cli");
const {log} = require("nodemon/lib/utils");

const conn = db.init();

exports.list = (req, res) => {
    //리스트 모듈
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
    let level = "";
    let data = {};
    let query = '';
    sql = ' SELECT * FROM login_id WHERE id = ?';
    conn.query(sql, (body.id), (err, log) => {
        try {
            level = log[0].level;
        } catch (err) {
            level = 0;
        }
    })

    if (body.keyword) where += ` AND subject like '%${body.keyword}%' `;
    if (body.search == "bookmark") {
        //북마크일때 처리문
        sql = ` SELECT count(*) cnt
                FROM bookmark
                WHERE id = ? ${where} `;
        conn.query(sql, [body.id], (err, data) => {
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
                        FROM bookmark
                        WHERE id = ? ${where}
                        ORDER BY no DESC LIMIT ?, ? `;
                conn.query(sql, [body.id, start, end], (err, data) => {
                    if (err) console.log(err);
                    for (let i = 0; i < data.length; i++) {
                        if (data.length == 0) {
                            console.log("데이터가 없음.")
                            break;
                        }
                        if (i == data.length - 1) query += `num = ${data[i].num}`
                        else query += `num = ${data[i].num} or `
                    }
                    if (data.length == 0) sql = `select *
                                                 from tb_board
                                                 where board_code = "nope"`
                    else if (body.standard == "views") {
                        sql = `select *
                               from tb_board
                               where ${query}
                               ORDER BY views DESC `;
                    } else if (body.standard == "writer") {
                        sql = `select *
                               from tb_board
                               where ${query}
                               ORDER BY name, id`;
                    } else {
                        sql = `select *
                               from tb_board
                               where ${query}`;
                    }
                    conn.query(sql, (err, list) => {
                        if (err) console.log(err);
                        res.send({success: true, list: list, paging: paging, level: level});
                    })
                })
            }
        )
    } else {
        //북마크가 아닐때 처리문
        if (body.day == '') {
            sql = ` SELECT count(*) cnt
                    FROM tb_board
                    WHERE board_code = ? ${where} `;
        }
        if (body.search == 'id') {
            sql = ` SELECT count(*) cnt
                    FROM tb_board
                    WHERE board_code = ? ${where} AND id = ?`;
        } else sql = ` SELECT count(*) cnt
                       FROM tb_board
                       WHERE board_code = ? ${where} AND regdate like ?`;
        if (body.day == '') input = [body.board_code, body.day]
        if (body.search == 'id') input = [body.board_code, body.id]
        conn.query(sql, input, (err, data) => {
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
            if (body.search == 'all') {
                if (body.standard == "day") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where}
                            ORDER BY num DESC LIMIT ?, ? `;
                } else if (body.standard == "views") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where}
                            ORDER BY views DESC LIMIT ?, ? `;
                } else {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where}
                            ORDER BY name, id LIMIT ?, ? `;
                }

                conn.query(sql, [body.board_code, start, end], (err, list) => {
                    if (err) console.log(err);
                    res.send({success: true, list: list, paging: paging, level: level});
                })
            } else if (body.search == "day") {
                if (body.standard == "day") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ?
                            ORDER BY num DESC LIMIT ?, ? `;
                } else if (body.standard == "views") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ?
                            ORDER BY views DESC LIMIT ?, ? `;
                } else {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ?
                            ORDER BY name, id LIMIT ?, ? `;
                }

                conn.query(sql, [body.board_code, body.day, start, end], (err, list) => {
                    if (err) console.log(err);
                    res.send({success: true, list: list, paging: paging, level: level});
                })
            } else if (body.search == "id") {
                if (body.standard == "day") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ?
                            ORDER BY num DESC LIMIT ?, ? `;
                } else if (body.standard == "views") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ?
                            ORDER BY views DESC LIMIT ?, ? `;
                } else {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ?
                            ORDER BY name, id LIMIT ?, ? `;
                }
                conn.query(sql, [body.board_code, body.id, start, end], (err, list) => {
                    if (err) console.log(err);
                    res.send({success: true, list: list, paging: paging, level: level});
                })
            }
            // if (body.standard == "day") {
            //     sql = ` SELECT *
            //         FROM tb_board
            //         WHERE board_code = ? ${where}
            //         ORDER BY num DESC LIMIT ?, ? `;
            // } else {
            //     sql = ` SELECT *
            //         FROM tb_board
            //         WHERE board_code = ? ${where}
            //         ORDER BY views DESC LIMIT ?, ? `;
            // }
            //
            // conn.query(sql, [body.board_code, start, end], (err, list) => {
            //     if (err) console.log(err);
            //     res.send({success: true, list: list, paging: paging, level: level});
            // })
        })
    }
}

exports.bookmark = (req, res) => {
    console.log(req.params.id + " " + req.params.num);
    if (req.params.isbookmark == "true") {
        sql = ` DELETE
                FROM bookmark
                WHERE id = ?
                  and num = ?`;
        conn.query(sql, [req.params.id, req.params.num], (err, log) => {
            if (err) console.log(err);
            else res.send({ok: "ok"})
        })
    } else {
        sql = ` INSERT INTO bookmark (id, num, regdate)
                values (?, ?, now())`
        conn.query(sql, [req.params.id, req.params.num], (err, log) => {
            if (err) console.log(err);
            else res.send({ok: "Ok"});
        })
    }
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
    let bookmark = false;
    sql = ` SELECT *
            FROM bookmark
            WHERE id = ?`;
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        for (let i = 0; i < log.length; i++) {
            if (log[i].num == req.params.num) bookmark = true
        }
    })
    sql = " SELECT * FROM tb_board WHERE num = ? ";
    conn.query(sql, [num], (err, view) => {
        if (err) console.log(err);
        sql = " SELECT level, id FROM login_id WHERE id = ?";
        conn.query(sql, (req.params.id), (err, log) => {
            if (err) console.log(err);
            res.send({success: true, view: view, user: log[0], bookmark: bookmark});
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
    sql = " SELECT * FROM login_id ORDER BY level DESC";
    conn.query(sql, (err, log) => {
        if (err) console.log(err);
        res.send({list: log})
    })
}