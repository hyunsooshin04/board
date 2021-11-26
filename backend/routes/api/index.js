const router = require('express').Router();
const board = require('./board'); //board router 호출
const lg = require('./login')
router.all('*', (req, res, next) => {
    console.log("path=" + req.path);
    next();
})

router.get("/signup/:id/:pwd/:name", lg.signup)

router.get("/login/:id/:password", lg.login)

router.use("/board", board); //board router 적용

router.all('*', (req, res) => {
    res.status(404).send({success: false, msg: `api unknown uri ${req.path}`});
})

module.exports = router;