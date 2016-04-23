'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var PaymentInfo = mongoose.model('PaymentInfo');
var Purchase = mongoose.model('Purchase');

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/secret-stash', ensureAuthenticated, function(req, res) {

    var theStash = [
        'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
        'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
        'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
        'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
        'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
        'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
        'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
        'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
        'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
        'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
        'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'
    ];

    res.send(_.shuffle(theStash));

});

router.param('id', function(req, res, next, id) {
    User.findById(id).exec()
        .then(function(user) {
            if (!user) throw new Error(404);
            req.requestedUser = user;
            next();
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
            // if (item._id.toString() === itemId.toString()) {
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
    var donePurchase = {
        items: req.requestedUser.cart,
        user: req.requestedUser._id
    };
    console.log("CREATING PURCHASE FROM")
    console.log(donePurchase)
    return Purchase.create(donePurchase)
    .then(function(createdPurchase) {
         req.requestedUser.cart = [];
    req.requestedUser.save();
    res.sendStatus(201);
    })
});

router.get('/:id/cart', function(req, res, next) {
    const promiseQueries = [];
    req.requestedUser.cart.forEach((item) => {
        promiseQueries.push(
            mongoose.model('Product').findById(item.productInfo))
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
    res.json(req.requestedUser);
});

router.put('/:id/checkout', function(req, res, next) {
    req.user.address = new Address(req.body.address);
    req.user.paymentInfo.push(
        new PaymentInfo({
            name: req.body.paymentInfo.name,
            billingAddress: new Address(req.body.paymentInfo.billinfo),
            ccNum: req.body.paymentInfo.ccNum
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
    if (req.user.isAdmin) { // not sure if this works, req.user doesn't exist from Postman, which is good, but can't check functionality until we make requests from webpage.
        req.requestedUser.remove()
            .then(function() {
                res.status(204).end();
            })
            .catch(next);
    } else res.send(401);
});

module.exports = router;
