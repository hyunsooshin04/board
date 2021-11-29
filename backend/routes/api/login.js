const db = require('../../config/db');
const {log} = require("nodemon/lib/utils");

const conn = db.init();

exports.login = (req, res) => {
    sql = " SELECT * FROM login_id WHERE ID = ?";
    conn.query(sql, [req.params.id], (err, log) => {
            try {
                if (log[0].id == req.params.id) {
                    if (log[0].pwd == req.params.password) {
                        console.log("로그인 완료");
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
            sql = " INSERT INTO  login_id (id, pwd, name ) values (?, ?, ?)";
            console.log(req.params.id + req.params.pwd + req.params.name)
            conn.query(sql, [req.params.id, req.params.pwd, req.params.name], (err, req) => {
                try {
                    res.send({success: "signup_success"});
                } catch (e) {
                    res.send({success: "error"});
                }
            })
        }
    })
}

exports.myinfor = (req, res) => {
    sql = " SELECT * FROM login_id WHERE id = ?";
    conn.query(sql, (req.params.id), (err, log) => {
        if (err) console.log(err);
        console.log(log[0].gender)
        res.send({gender: log[0].gender, hobby: log[0].hobby, city: log[0].city, cont: log[0].cont})
    })
}