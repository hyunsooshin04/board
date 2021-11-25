var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.send('hi1');
});

router.get('/about', function(req, res) {
    res.send('hi2');
});

module.exports = router;