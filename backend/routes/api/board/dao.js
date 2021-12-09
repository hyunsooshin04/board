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
    let isLogin = body.isLogin;
    let logquery = '';
    sql = ' SELECT * FROM login_id WHERE id = ?';
    conn.query(sql, (body.id), (err, log) => {
        try {
            level = log[0].level;
        } catch (err) {
            level = 0;
        }
    })

    if (body.keyword) where += ` AND subject like '%${body.keyword}%' `;
    if (body.search == "bookmark") { //북마크일때 처리문
        sql = ` SELECT count(*) cnt
                FROM bookmark
                WHERE id = ? ${where} `;
        conn.query(sql, [body.id], (err, data) => { //페이지 수를 나누기 위한 로직
                if (err) console.log(err);
                totalCount = data[0].cnt;
                total_page = Math.ceil(totalCount / ipp); //페이지 수를 / 10 한뒤 올림을 해 정수로 구함
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
                        if (data.length == 0) break;
                        if (i == data.length - 1) query += `num = ${data[i].num}`
                        else query += `num = ${data[i].num} or `
                    }
                    if (data.length == 0) sql = `select * 
                                                 from tb_board
                                                 where board_code = "nope"` //만약 즐겨찾기에 아무것도 없다면 처리해주는 처리 문
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
                    } else if (body.standard == "day") {
                        sql = `select *
                               from tb_board
                               where ${query}`;
                    } else {
                        console.log("all")
                        sql = ` SELECT *
                                FROM tb_board
                                WHERE ${query}
                                ORDER BY liked DESC `;
                    }
                    conn.query(sql, (err, list) => {
                        if (err) console.log(err);
                        res.send({success: true, list: list, paging: paging, level: level});
                    })
                })
            }
        )
    } else {
        if (body.isLogin == "true") ;
        else {
            logquery = ' AND isLogin = "false" '
        }
        //북마크가 아닐때 처리문
        if (body.search == 'id') { //특정 작성자가 작성한 게시글만 모으고 싶은 경우
            sql = ` SELECT count(*) cnt
                    FROM tb_board
                    WHERE board_code = ? ${where} AND id = ? ${logquery}`;
            input = [body.board_code, body.id]
        } else if (body.search == 'day') { //특정 날짜에 작성된 게시글만 모으고 싶은 경우
            sql = ` SELECT count(*) cnt
                    FROM tb_board
                    WHERE board_code = ? ${where} AND regdate like ? ${logquery}`;
            input = [body.board_code, body.day]
        } else { //전체 게시글 보기
            sql = ` SELECT count(*) cnt
                    FROM tb_board
                    WHERE board_code = ? ${where} ${logquery}`;
            input = [body.board_code];
        }
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
                            WHERE board_code = ? ${where} ${logquery}
                            ORDER BY num DESC LIMIT ?, ? `;
                } else if (body.standard == "views") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} ${logquery}
                            ORDER BY views DESC LIMIT ?, ? `;
                } else if (body.standard == "writer") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} ${logquery}
                            ORDER BY name, id LIMIT ?, ? `;
                } else {
                    console.log("all")
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} ${logquery}
                            ORDER BY liked DESC LIMIT ?, ? `;
                }

                conn.query(sql, [body.board_code, start, end], (err, list) => {
                    if (err) console.log(err);
                    res.send({success: true, list: list, paging: paging, level: level});
                })
            } else if (body.search == "day") {
                if (body.standard == "day") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ? ${logquery}
                            ORDER BY num DESC LIMIT ?, ? `;
                } else if (body.standard == "views") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ? ${logquery}
                            ORDER BY views DESC LIMIT ?, ? `;
                } else if (body.standard == "writer") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ? ${logquery}
                            ORDER BY name, id LIMIT ?, ? `;
                } else {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} AND regdate like ? ${logquery}
                            ORDER BY liked DESC LIMIT ?, ? `;
                }

                conn.query(sql, [body.board_code, body.day, start, end], (err, list) => {
                    if (err) console.log(err);
                    res.send({success: true, list: list, paging: paging, level: level});
                })
            } else if (body.search == "id") {
                if (body.standard == "day") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ? ${logquery}
                            ORDER BY num DESC LIMIT ?, ? `;
                } else if (body.standard == "views") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ? ${logquery}
                            ORDER BY views DESC LIMIT ?, ? `;
                } else if (body.standard == "writer") {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ? ${logquery}
                            ORDER BY name, id LIMIT ?, ? `;
                } else {
                    sql = ` SELECT *
                            FROM tb_board
                            WHERE board_code = ? ${where} and id = ? ${logquery}
                            ORDER BY liked DESC LIMIT ?, ? `;
                }
                conn.query(sql, [body.board_code, body.id, start, end], (err, list) => {
                    if (err) console.log(err);
                    res.send({success: true, list: list, paging: paging, level: level});
                })
            }
        })
    }
}

exports.bookmark = (req, res) => {
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
    let see = '';
    if (body.see) see = "true";
    else see = "false";
    sql = " UPDATE tb_board SET subject = ?, cont = ?, editdate = now(), isLogin = ? WHERE num = ? ";
    conn.query(sql, [body.subject, body.cont, see, body.num], (err, result) => {
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
    let isLiked = '';
    let like_cnt = '';

    //북마크 확인 쿼리문
    sql = ` SELECT *
            FROM bookmark
            WHERE id = ?`;
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        for (let i = 0; i < log.length; i++) {
            if (log[i].num == req.params.num) bookmark = true
        }
    })
    //좋아요를 했는지 확인을 해주는 쿼리문
    sql = ' SELECT * FROM liked WHERE id = ? AND num = ?';
    conn.query(sql, [req.params.id, req.params.num], (err, log) => {
        if (err) console.log(err);
        isLiked = Boolean(log.length)
    })
    //좋아요 갯수를 가져오는 쿼리문
    sql = ` SELECT *
            FROM liked
            WHERE num = ?`;
    conn.query(sql, [req.params.num], (err, log) => {
        if (err) console.log(err);
        like_cnt = log.length;
    })

    //내용을 뿌려주는 쿼리문
    sql = " SELECT * FROM tb_board WHERE num = ? ";
    conn.query(sql, [num], (err, view) => {
        if (err) console.log(err);
        sql = " SELECT level, id FROM login_id WHERE id = ?";
        conn.query(sql, (req.params.id), (err, log) => {
            if (err) console.log(err);
            console.log(like_cnt)
            res.send({
                success: true,
                view: view,
                user: log[0],
                bookmark: bookmark,
                board_code: view[0].board_code,
                isLiked: isLiked,
                cnt: like_cnt
            });
        })
    });
    //조회수 증가 쿼리문
    sql = " UPDATE tb_board SET views = views + 1 WHERE num = ?"
    conn.query(sql, [req.params.num]), (err, view) => {
        if (err) console.log(err);
    }
}

exports.isLike = (req, res) => {
    let query = req.query;
    let like_cnt = '';
    if (query.id == 'Guest') {
        res.send({ok: "guest"})
    } else if (query.isLike == 'false') {
        sql = ' INSERT INTO liked (id, num) values (?, ?)';
        conn.query(sql, [query.id, query.num], (err, log) => {
            if (err) console.log(err);
            sql = ` SELECT *
                    from liked
                    WHERE num = ?`;
            conn.query(sql, [query.num], (err, data) => {
                if (err) console.log(err);
                like_cnt = data.length;
                sql = " UPDATE tb_board SET `liked` = ? WHERE `num` = ?";
                conn.query(sql, [like_cnt, query.num], (err, log) => {
                    if (err) console.log(err);
                })
            })
            console.log("wdwd" + like_cnt)

            res.send({ok: "ok"})
        })
    } else {
        sql = ' DELETE from liked WHERE id = ? AND num = ?';
        conn.query(sql, [query.id, query.num], (err, log) => {
            if (err) console.log(err);
            sql = ` SELECT *
                    from liked
                    WHERE num = ?`;
            conn.query(sql, [query.num], (err, log) => {
                like_cnt = log.length
                sql = " UPDATE tb_board SET `liked` = ? WHERE `num` = ?";
                conn.query(sql, [like_cnt, query.num], (err, log) => {
                    if (err) console.log(err);
                })
            })
            res.send({ok: "del"});
        })
    }
}

exports.add = (req, res) => { //등록 프로세스 모듈
    body = req.body; //전송된 데이터를 받는다.
    let see = '';
    if (body.see) see = "true";
    else see = "false";
    sql = " INSERT INTO  tb_board (board_code, subject, cont, id, name, regdate, views, isLogin) values (?, ?, ?, ?, ?,now(), 0, ?) ";
    conn.query(sql,
        [body.board_code, body.subject, body.cont, body.id, body.name, see],
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