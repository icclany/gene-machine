'use strict'
var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String //url
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number
    },
    category: {
        type: String,
        enum: ['small', 'medium', 'large']
    },
    reviews: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    description: String,
    tags: {
        type: [String]
    }
});

mongoose.model('Product', productSchema);
