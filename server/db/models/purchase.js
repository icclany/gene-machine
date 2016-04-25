'use strict';
var mongoose = require('mongoose');
var CartSchema = mongoose.model('Cart').schema;

var purchaseSchema = new mongoose.Schema({
  items: [CartSchema],
  total: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  id: {
    type: String
  },
  email: {
    type: String
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
});

mongoose.model('Purchase', purchaseSchema);
