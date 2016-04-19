'use strict';
var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    numStars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

mongoose.model('Review', reviewSchema);
