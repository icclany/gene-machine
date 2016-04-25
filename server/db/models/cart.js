'use strict';
var mongoose = require('mongoose');


var cartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1
    },
    productInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

cartSchema.methods.populateCart = function() {
    var cart = this;
    return mongoose.model('Product').findById(this.productInfo)
        .then(function(product) {
            return product.populate('reviews')
            .deepPopulate('reviews.user')
            .then(function(product) {
                // Decrement amounts in stock
                product.stock = (product.stock - cart.quantity);
                return product.save();
            })
            .then(function(product) {
                return {
                quantity: cart.quantity,
                productInfo: product
            };
        });
            });
};

mongoose.model('Cart', cartSchema);
