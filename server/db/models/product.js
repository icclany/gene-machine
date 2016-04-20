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
    thumbnail: {
        type: String // smaller image for the multiple product view aka product.html
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
    description: {
        type: String
    },
    tags: {
        type: [String]
    }
});

mongoose.model('Product', productSchema);
