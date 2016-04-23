'use strict';
var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({ //add new to mongoose.Schema and made variable schema
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
    type: String,
    required: true
  },
});

mongoose.model('Address', addressSchema); //make things more consistent


