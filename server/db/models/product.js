'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
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
    reviews: [
    { type : mongoose.Schema.Types.ObjectId,
        ref: 'Review' }
        ],
    description: {
        type: String
    },
    tags: {
        type: [String]
    }
});

productSchema.plugin(deepPopulate);
mongoose.model('Product', productSchema);
