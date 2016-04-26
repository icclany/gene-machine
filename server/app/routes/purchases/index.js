'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Purchase = mongoose.model('Purchase');
var User = mongoose.model('User');

router.param('id', function(req, res, next, id) {
  console.log(id);
    Purchase.findById(id).exec()
        .then(function(Purchase) {
            if (!Purchase) throw new Error(404);
            req.requestedPurchase = Purchase;
            next();
        })
        .catch(next);
});

router.get('/', function(req, res, next) {
    Purchase.find({})
    .then(purchases => {
        console.log('check out these purchases bro. in the router', purchases);
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

router.put('/:id', function(req, res,next){
  req.requestedPurchase.shippingDate = Date.now();
  req.requestedPurchase.save()
    .then(function(updatedPurchase){
      res.send(updatedPurchase);
    })
  .catch(next);
});
