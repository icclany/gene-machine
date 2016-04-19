'use strict';
var mongoose = require('mongoose');

var paymentInfoSchema = new mongoose.Schema({ //added new mongoose.Schema and added variable schema
  name: {
    type: String,
    required: true
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addressSchema'
  },
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
