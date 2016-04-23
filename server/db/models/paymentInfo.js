'use strict';
var mongoose = require('mongoose');
var AddressSchema = mongoose.model('Address').schema;

var paymentInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  billingAddress: AddressSchema,
  ccNum: {
    type: String,
    required: true
  },
  ccExpiration: {
    type: String,
    required: true
  }
});

mongoose.model('PaymentInfo', paymentInfoSchema);
