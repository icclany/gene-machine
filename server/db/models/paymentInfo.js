'use strict';
var mongoose = require('mongoose');

var PaymentInfo = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
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

mongoose.model('PaymentInfo', PaymentInfo);
