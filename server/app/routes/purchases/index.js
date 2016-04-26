'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Purchase = mongoose.model('Purchase');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    Purchase.find({})
    .then(purchases => {
        res.json(purchases);
    })
    .catch(next);
});

router.post('/', function(req, res, next){
  Purchase.create(req.body).then(purchase=>{
    res.json(purchase);
  })
  .catch(next);
});
