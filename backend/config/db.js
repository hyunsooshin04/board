const mysql = require('mysql');

const dbInfo = {
    host:'localhost'
    ,user:'root'
    ,password:'toor'
    ,database:'board'
}

let dbcon = {
    init:function() {
        return mysql.createConnection(dbInfo);
    },
    conn:function(con) {
        con.connect(function(err){
            if(err) {
                console.log("mysql connection error :"+err);
                setTimeout(init, 2000);
            } else {
                console.log("mysql 연동 성공");
            }
        })
    }
}

module.exports = dbcon; //모듈 등록