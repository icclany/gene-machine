'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Purchase = mongoose.model('Purchase');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    Purchase.find({}).then(purchases => {
            res.json(purchases);
        })
        .catch(next);
});

router.put('/', function(req, res, next){
  console.log("inside purchase put route, req.body.token: ", req.body.token);
  Purchase.create(req.body.token).then(purchase=>{
    console.log("in purchases route, i think i've created a purchase: ", purchase);
    res.json(purchase);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
    User.findById(req.body.id)
    .then(function(user) {
        Promise.all(user.cart.map(cartSchema => {
            return cartSchema.populateCart();
        }))
        .then(function(populatedCart) {
            var donePurchase = {
                items: populatedCart,
                total: req.body.total,
                user: user._id,
            };
            return Purchase.create(donePurchase);
        })
        .then(function() {
            console.log("Purchase success");
            res.sendStatus(201);
        });
    })
    .catch(next);
});
