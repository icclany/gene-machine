'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Products = mongoose.model('Product');

router.get('/', function(req, res, next) {
    Products.find({}).then(products => {
            res.json(products);
        })
        .catch(next);
});

router.post('/', function(req, res, next) {
    if (!req.user) {
        res.sendStatus(404);
    } else if (req.user.isAdmin) {
       Products.create(req.body)
            .then(function() {
                res.sendStatus(200);
            });
    }
});

router.get('/:id', function(req, res, next) {
    Products.findById(req.params.id)
        .populate('reviews')
        .deepPopulate('reviews.user')
        .then(product => {
            res.send(product);
        })
        .catch(next);
});

router.put('/:id', function(req, res, next) {
    if (req.user.isAdmin) {
        Products.findByIdAndUpdate(req.params.id, req.body)
            .then(function(product) {
                product.save();
                res.sendStatus(200);
            });
    } else { res.sendStatus(404) };
});

router.delete('/:id', function(req, res, next) {
    if (req.user.isAdmin) {
        Products.findOneAndRemove({ _id: req.params.id })
            .then(function() {
                res.send(204);
            });
    } else { res.sendStatus(404) };
});
