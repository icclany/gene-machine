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
    // .populate('reviews')
    // .deepPopulate('reviews')
    .then(product=> {
        console.log("found the product")
        console.log(product)
        console.log("review is")
        console.log(product.reviews)
        res.send(product);
    })
    .catch(next);
});

// For search, doing on front-end

