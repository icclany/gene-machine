'use strict';
var mongoose = require('mongoose');

var purchaseSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }], // received error RE: nesting schemas
  // items: [
  //   {
  //      itemId: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'Product'
  //       },
  //       priceAtPurchase: {
  //         type: Number,
  //         required: true
  //       },
  //       required: true // What is required - one array element? Iffy on this
  // }], // must keep array of prices of items when purchased
  total: { // Should be a method that sums up the prices
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Purchase', purchaseSchema); //make things more consistent
