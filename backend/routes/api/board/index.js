const router = require('express').Router();

router.get("/",(req,res)=>{ //화면에 good 노출
    res.send("good");
});

router.all('*',(req, res)=> {
    res.status(404).send({success:false, msg:'board unknown uri ${req.path}'});
})

console.log("board에접근")

module.exports = router;