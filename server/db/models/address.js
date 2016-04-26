'use strict';
var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  name: {
    type: String
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
    type: String,
    required: true
  },
});

mongoose.model('Address', addressSchema);
