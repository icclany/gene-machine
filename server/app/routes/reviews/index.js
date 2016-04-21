'use strict';

var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Reviews = mongoose.model('Review');


router.get('/', function (req, res, next) {
    Reviews.find({}).then(reviews=> {
        res.json(reviews);
    })
    .catch(next);
});

router.get('/:id', function (req, res, next) {
    Reviews.findById(req.params.id)
    // .populate('reviews')
    // .populate('reviews')
    .then(review=> {
        res.json(review);
    })
    .catch(next);
});

// For search, doing on front-end

