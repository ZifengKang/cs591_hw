const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cs411')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: String
})
const Str = mongoose.model('string', stringSchema)

let findByName = function (checkName) {
    return new Promise(function (resolve, reject) {
        Str.find({string: checkName}, function (err, results) {
            if (results.length > 0) {
                resolve({found: results})
            }
            else {
                reject({found: false})
            }
        })
    })
}

router.get('/:string', function (req, res, next) {
    let input = req.params.string
    let len = input.length
    findByName(req.params.string)
        .then(function (status) {
            res.json(status)
        })
        .catch(function (status) {
            let aString = new Str({string: input, length: len})
            aString.save()
            res.json(status)

        })
})

router.get('/', function (req, res, next) {
    Str.find({}, function (err, results) {
        res.json(results);
    })

})


router.post('/', function(req, res, next) {
    let input = req.body.string
    if (input ==="") {
        res.send("please insert a value")
    }

    else {
        findByName(req.body.string)
            .then(function (status) {
                res.json(status)
            })
            .catch(function (status) {
                let aString = new Str({string: input, length: input.length})
                aString.save()
                res.json(status)

            })
    }

})


router.delete('/:string', function (req, res, next) {
    findByName(req.params.string)
        .then(function (status) {
            Str.findOneAndRemove({string: req.params.string}, function (err, result) {
                {
                    res.json({message: 'success'});
                }
            })
        })
        .catch(function (status){
            res.json("string not found")
        })
})


module.exports = router;