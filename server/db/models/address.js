'use strict';
var mongoose = require('mongoose');

var Address = new mongoose.Schema({ //add new to mongoose.Schema
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

mongoose.model('Address', Address);
