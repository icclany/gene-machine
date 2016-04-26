'use strict';
var mongoose = require('mongoose');
var AddressSchema = mongoose.model('Address').schema;

var paymentInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  billingAddress: AddressSchema,
  ccNum: {
    type: String
  },
  ccExp: {
    type: String
  }
});

mongoose.model('PaymentInfo', paymentInfoSchema);
