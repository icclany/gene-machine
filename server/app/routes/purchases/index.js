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

router.put('/', function(req, res, next){
  Purchase.create(req.body.token).then(purchase=>{
    res.json(purchase);
  })
  .catch(next);
});
