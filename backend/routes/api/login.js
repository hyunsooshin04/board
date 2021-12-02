const db = require('../../config/db');
const {log} = require("nodemon/lib/utils");

const conn = db.init();

exports.login = (req, res) => {
    sql = " SELECT * FROM login_id WHERE ID = ?";
    conn.query(sql, [req.params.id], (err, log) => {
            try {
                if (log[0].id == req.params.id) {
                    if (log[0].pwd == req.params.password) {
                        res.send({isLogin: "true", name: log[0].name, id: log[0].id})
                    } else res.send({isLogin: "pwd"})
                } else res.send({isLogin: "error"})
            } catch (err) {

                console.log('err : ' + err)
                res.send({isLogin: "id"})
            }
        }
    )
}

exports.signup = (req, res) => {
    let check = false;

    sql = " SELECT * FROM login_id WHERE ID = ?";
    conn.query(sql, [req.params.id], (err, log) => {
        try {
            console.log(log[0].id)
            check = false;
            res.send({success: "id_overlap"});
        } catch (e) {
            check = true;
        }
        if (check) {
            sql = " INSERT INTO  login_id (level,id, pwd, name, gender) values (1, ?, ?, ?, ?)";
            conn.query(sql, [req.params.id, req.params.pwd, req.params.name, "미설정"], (err, req) => {
                if (err) console.log(err);
                console.log(req)
                res.send({success: "ok"});
            })
        }
    })
}

exports.myinfor = (req, res) => {
    sql = " SELECT * FROM login_id WHERE id = ?";
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        res.send({
            gender: log[0].gender,
            hobby: log[0].hobby,
            city: log[0].city,
            cont: log[0].cont,
            pwd: log[0].pwd,
            msg: log[0].question,
            answer: log[0].answer
        })
    })
}

exports.edit = (req, res) => {
    console.log(req.body);
    sql = " UPDATE login_id SET pwd = ?, cont = ?, gender = ?, hobby = ?, city = ?, question = ?, answer = ? WHERE id = ?";
    conn.query(sql, [req.body.pwd, req.body.msg, req.body.gender, req.body.hobby, req.body.city, req.body.question, req.body.answer, req.body.id], (err, log) => {
        if (err) console.log(err);
        res.send({edit: true})
    })
}

exports.pwsearch = (req, res) => {
    sql = " SELECT * FROM login_id WHERE id = ?";
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        if (log == '') res.send({isId: false})
        else {
            if (log[0].question == null) res.send({isId: "null"});
            else res.send({isId: true, msg: log[0].question})
        }
    })
}

exports.editpwd = (req, res) => {
    sql = " SELECT * FROM login_id WHERE id = ?";
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        if (log[0].answer == req.params.answer) {
            sql = " UPDATE login_id SET pwd = ? WHERE id = ?";
            conn.query(sql, [req.params.pwd, req.params.id], (err, log) => {
                if (err) console.log(err);
                res.send({check: true});
            })
        } else {
            res.send({check: false});
        }
    })
}

exports.userinfo = (req, res) => {
    sql = " SELECT * FROM login_id WHERE id = ?";
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        res.send({name: log[0].name, cont: log[0].cont, hobby: log[0].hobby, gender: log[0].gender, city: log[0].city})
    })
}