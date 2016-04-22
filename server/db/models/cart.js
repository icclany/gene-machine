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

mongoose.model('Cart', cartSchema); //make things more consistent
