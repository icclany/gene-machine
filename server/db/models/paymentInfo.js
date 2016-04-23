'use strict';
var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({ //add new to mongoose.Schema and made variable schema
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
});


var paymentInfoSchema = new mongoose.Schema({ //added new mongoose.Schema and added variable schema
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

mongoose.model('PaymentInfo', paymentInfoSchema); //make it more consistent
