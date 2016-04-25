'use strict';
var mongoose = require('mongoose');
var AddressSchema = mongoose.model('Address').schema;

var paymentInfoSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  billingAddress: AddressSchema,
  ccNum: {
    type: String
  },
  ccExpiration: {
    type: String
  }
});

mongoose.model('PaymentInfo', paymentInfoSchema);
