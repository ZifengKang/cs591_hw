var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res, next) {
    res.send('Welcome to hw1.');
})

router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    let theLength = req.params.len
    let retVal = {"string": theName, "length": theLength}
    res.json(retVal)
//    next()
})

router.param('name', function (req, res, next, value) {
    console.log('got', value)
    let obj = req.params.name
    req.params.len = obj.length
    next()
})
router.post('/', function (req, res, next) {
    let theName = req.body.name
    let theLength = theName.length
    let retVal = {"string": theName, "length": theLength}
    res.json(retVal)
})

module.exports = router;