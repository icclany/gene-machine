'use strict';

var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Products = mongoose.model('Products');


router.get('/', function (req, res, next) {
    Products.find({}).then(products=> {
        res.json(products);
    })
    .catch(next);
});

router.get('/:category', function (req, res) {
    Products.find({category: req.params.category}).then(products=> {
        res.json(products);
    })
    .catch(next);
});

router.get('/:id', function (req, res) {
    Products.findById(req.params.id).then(product => {
        res.json(product);
    })
    .catch(next);
});

// Search by tag?
// /search/tags=small

router.get('/search', function (req, res) {
    Products.find({tags: {$elemMatch: {req.query.tags}}}).then(product => {
        res.json(product);
    })
    .catch(next);
});

