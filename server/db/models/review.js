'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var reviewSchema = new mongoose.Schema({
    numStars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
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

reviewSchema.plugin(deepPopulate);
mongoose.model('Review', reviewSchema);
