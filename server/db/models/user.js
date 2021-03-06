'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var AddressSchema = mongoose.model('Address').schema;
var PaymentSchema = mongoose.model('PaymentInfo').schema;
var _ = require('lodash');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
      type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    cart: {},
    address: [AddressSchema],
    paymentInfo: [PaymentSchema],
    reviews: {
      type: Array
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    resetPassword: String,
    resetPasswordExpiration:Date,
});

// method to remove sensitive information from user objects before sending them out
userSchema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'resetPassword', 'resetPasswordExpiration', 'salt']);
};

// **Get purchases method**
userSchema.methods.getPurchases = function () {
  return mongoose.model('Purchase').find({user: this._id});
};

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
