'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var PaymentInfo = mongoose.model('PaymentInfo');
var Purchase = mongoose.model('Purchase');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'genemachine.agct@gmail.com',
      pass: 'GeneMachine'
    }
});

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.param('id', function(req, res, next, id) {
    User.findById(id).exec()
        .then(function(user) {
            if (!user) throw new Error(404);
            req.requestedUser = user;
            next();
        })
        .catch(next);
});

router.post('/reset', function(req, res, next) {
    var token = User.generateSalt();
    User.findOne({ email: req.body.email })
    .then(function(user) {
        user.disabled = true;
        user.password = User.generateSalt();
        user.resetPassword = token;
        user.resetPasswordExpiration = Date.now() + 3600000; // 1 hour
        return user.save();
      })
    .then(function(savedUser){

        var mailOptions = {
            to: 'GeneMachine.AGCT@gmail.com',
            from: 'GeneMachine.AGCT@google.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err, info) {
            if (err){
                console.error(err);
            } else {
                res.json('info', 'An e-mail has been sent to ' + savedUser.email + ' with further instructions.');

            }
        });
    })
    .catch(next);
});

router.put('/reset/:token', function(req,res,next){
    User.findOne({resetPassword: req.params.token })
    .then(function(user){
        req.body.resetPassword = null;
        req.body.resetPasswordExpiration = null;
        _.extend(user, req.body);
        return user.save();
    })
    .then(function(savedUser){
        res.sendStatus(201);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    User.find({}).exec()
        .then(function(users) {
            res.json(users);
        })
        .catch(next);
});

router.post('/', function(req, res, next) {
    if (req.body.username.length && req.body.password.length) {
        User.create(req.body)
            .then(function(user) {
                res.status(201).json(user);
            })
            .catch(next);
    } else {
        res.send(401);
    }
});

router.post('/:id/cart', function(req, res, next) {
    let item = req.body.item;
    req.requestedUser.addToCart(item);
    res.sendStatus(201);
});

router.put('/:id/cart', function(req, res, next) {
    let itemId = req.body.productId;
    let itemQuantity = req.body.quantity;

    req.requestedUser.cart.forEach((item) => {
        if (item.productInfo.toString() === itemId.toString()) {
            item.quantity = itemQuantity;
        }
    });
    req.requestedUser.save();
    res.sendStatus(201);
});

router.delete('/:id/cart/:productId', function(req, res, next) {
    let itemId = req.params.productId;
    let index = null;

    for (let i = 0; i < req.requestedUser.cart.length; i++) {
        if (req.requestedUser.cart[i].productInfo.toString() === itemId.toString()) {
            index = i;
        }
    }
    req.requestedUser.cart.splice(index, 1);
    req.requestedUser.save();
    res.sendStatus(201);
});

router.delete('/:id/cart', function(req, res, next) {
    req.requestedUser.cart = [];
    req.requestedUser.save();
    res.sendStatus(201);
});

router.get('/:id/cart', function(req, res, next) {
    const promiseQueries = [];
    req.requestedUser.cart.forEach((item) => {
        promiseQueries.push(
            mongoose.model('Product').findById(item.productInfo));
    })
    Promise.all(promiseQueries)
        .then((populatedItems) => {
            req.requestedUser.cart.forEach((item) => {
                populatedItems.forEach((popItem) => {
                    if (item.productInfo.toString() === popItem._id.toString()) {
                        item.productInfo = popItem;
                    }
                });
            });
            res.json(req.requestedUser.cart);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    req.requestedUser.getPurchases()
        .then(purchases => {
            console.log("purchases are")
            console.log(purchases)
            res.json(purchases);
        });
});

router.put('/:id/checkout', function(req, res, next) {
    req.user.address.push(new Address(req.body.address));
    req.user.paymentInfo.push(
        new PaymentInfo({
            name: req.body.paymentInfo.name,
            billingAddress: new Address(req.body.paymentInfo.billingAddress),
            ccNum: req.body.paymentInfo.ccNum,
            ccExpiration: req.body.paymentInfo.ccExpiration
        }));
    req.user.save();
    res.sendStatus(202);
});

router.put('/:id', function(req, res, next) {
    if (req.user.isAdmin) {
        _.extend(req.requestedUser, req.body);
        req.requestedUser.save()
            .then(function(user) {
                res.json(user);
            })
            .catch(next);
    } else res.sendStatus(401);
});

router.delete('/:id', function(req, res, next) {
    if (req.user.isAdmin) {
        req.requestedUser.remove()
            .then(function() {
                res.status(204).end();
            })
            .catch(next);
    } else res.send(401);
});

module.exports = router;
