'use strict';
var mongoose = require('mongoose');

var AddressSchema = mongoose.model('Address').schema;
var PaymentSchema = mongoose.model('PaymentInfo').schema;

var purchaseSchema = new mongoose.Schema({
  items: {},
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
  address: AddressSchema,
  paymentInfo:PaymentSchema
});

mongoose.model('Purchase', purchaseSchema);
