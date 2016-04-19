'use strict';
var mongoose = require('mongoose');

var purchaseSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true // What is required - one array element? Iffy on this
  }], // must keep array of prices of items when purchased
  total: {
    type: Number,
    default: 0
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentInfo',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Purchase', purchaseSchema); //make things more consistent
