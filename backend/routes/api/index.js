const router = require('express').Router();
const board = require('./board'); //board router 호출
const lg = require('./login')
router.all('*', (req, res, next) => {
    console.log("path=" + req.path);
    next();
})

router.get("/myinfo/:id", lg.myinfor);

router.post("/edit/", lg.edit)

router.get("/signup/:id/:pwd/:name", lg.signup);

router.get("/login/:id/:password", lg.login);

router.get("/login/:id", lg.pwsearch);

router.get("/login/:id/:answer/:pwd", lg.editpwd);

router.get("/userinfo/:id/:userid", lg.userinfo)

router.get("/userinfo/update/:id/:level", lg.updatelevel)

router.use("/board", board); //board router 적용

router.all('*', (req, res) => {
    res.status(404).send({success: false, msg: `api unknown uri ${req.path}`});
})

module.exports = router;