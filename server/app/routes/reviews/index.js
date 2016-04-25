'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Reviews = mongoose.model('Review');
var Products = mongoose.model('Product');


router.get('/', function(req, res, next) {
    Reviews.find({}).then(reviews => {
            res.json(reviews);
        })
        .catch(next);
});

router.post('/', function(req, res, next) {
    Reviews.create(req.body)
        .then(function(review) {
            return Products.findById(req.body.product)
                .then(product => {
                    product.reviews.push(review);
                    product.save();
                    res.sendStatus(201);
                });
        })
        .catch(next);
});
