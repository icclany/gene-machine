'use strict';
var mongoose = require('mongoose');

var AddressSchema = mongoose.model('Address').schema;
var PaymentSchema = mongoose.model('PaymentInfo').schema;


function formattedDate(today){
  if (!today) {return null; }
  var strDate = 'Y-m-d'
  .replace('Y', today.getFullYear())
  .replace('m', today.getMonth()+1)
  .replace('d', today.getDate());
  return strDate;
}

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
    default: Date.now,
    get: formattedDate
  },
  id: {
    type: String
  },
  email: {
    type: String
  },
  shippingDate: {type: Date,
    get: formattedDate},
  address: AddressSchema,
  paymentInfo:PaymentSchema
});

purchaseSchema.set('toJSON', { getters: true});
purchaseSchema.set('toObject', { getters: true});

mongoose.model('Purchase', purchaseSchema);
