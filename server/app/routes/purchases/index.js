'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Purchase = mongoose.model('Purchase');

router.get('/', function (req, res, next) {
    Purchase.find({}).then(purchases=> {
        res.json(purchases);
    })
    .catch(next);
});

