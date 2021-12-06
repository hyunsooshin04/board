const router = require('express').Router();
const dao = require('./dao');

router.get("/",dao.list);

router.get('/:num/:id',dao.view);

router.post("/",dao.add);

router.put('/',dao.mod);

router.delete("/",dao.delete)

router.post("/comment", dao.comment)

router.get("/comment/get/:num", dao.getcomment)

router.get("/comment/del/:no", dao.del_comment)

router.get("/comment/update/:comment/:no", dao.update_comment)

router.get("/user/bookmark/:id/:num/:isbookmark", dao.bookmark)

router.get('/user/list/get', dao.userlist)

router.all('*',(req, res)=> {
    res.status(404).send({success:false, msg:'board unknown uri ${req.path}'});
})

module.exports = router;