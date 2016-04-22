'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var CartSchema = mongoose.model('Cart').schema;
var AddressSchema = mongoose.model('Address').schema;
var Cart = mongoose.model('Cart');
var _ = require('lodash');

var userSchema = new mongoose.Schema({ //make things more consistent
    email: {
        type: String,
        required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    cart: [CartSchema],
    address: [AddressSchema],
    paymentInfo: [{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'PaymentInfo'
    }],
    reviews: {
      type: Array
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// method to remove sensitive information from user objects before sending them out
userSchema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// **Get purchases method**
userSchema.methods.getPurchases = function () {
  return mongoose
  .model('Purchase').find({user: this._id})
  .populate('user items');
};

userSchema.methods.addToCart = function(obj) {
  var exists = false;

  for (let i = 0; i < this.cart.length; i++) {
    if (this.cart[i].productInfo == obj._id) {
      exists = true;
      this.cart[i].quantity++;
    }
  }

  if(!exists) {
    this.cart.push(new Cart({
      productInfo: obj._id
    }));
  }
  this.save();
}

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', userSchema);
