'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Products = mongoose.model('Product');

router.get('/', function (req, res, next) {
    Products.find({}).then(products=> {
        res.json(products);
    })
    .catch(next);
});

router.get('/category', function (req, res, next) {
    Products.find({category: req.query.type}).then(products=> {
        res.json(products);
    })
    .catch(next);
});

router.get('/:id', function (req, res, next) {
    Products.findById(req.params.id)
    .populate('reviews')
    .then(product=> {
        res.send(product);
    })
    .catch(next);
});
