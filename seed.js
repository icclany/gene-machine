/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

// in fields that req objectId, just do new Address({field: info, etc})

'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Address = mongoose.model('Address');
var Purchase = mongoose.model('Purchase');
var Review = mongoose.model('Review');
var PaymentInfo = mongoose.model('PaymentInfo');

var wipeCollections = function() {
    return Promise.all([
        User.remove({}),
        Product.remove({}),
        Address.remove({}),
        PaymentInfo.remove({}),
        Review.remove({})
    ]);
};

var seedUsers = function() {
    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        username: 'hello',
        firstName: 'Tester',
        lastName: 'McTest',
        isAdmin: true
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        username: 'hello',
        firstName: 'Barack',
        lastName: 'Obama',
        isAdmin: true
    }, {
        email: 'tk@gmail.com',
        password: '123',
        username: 'hello',
        firstName: 'Teaseung',
        lastName: 'Kim',
        isAdmin: false
    }, {
        email: 'Iris@gmail.com',
        password: 'fullstack',
        username: 'IrisTheFlamingHotCheeto',
        firstName: 'Iris',
        lastName: 'Chang',
        isAdmin: false
    }, {
        email: 'Brian@hotmail.com',
        password: 'imdabest',
        username: 'hello',
        firstName: 'Brian',
        lastName: 'McGough',
        isAdmin: false
    }, {
        email: 'anthony@aol.com',
        password: 'coolbeans',
        username: 'hello',
        firstName: 'Anthony',
        lastName: 'Velli',
        isAdmin: false
    }, {
        email: 'bob@gmail.com',
        password: 'seeding',
        username: 'hello',
        firstName: 'Bob',
        lastName: 'Dunn',
        isAdmin: false
    }, {
        email: 'abc@hotmail.com',
        password: 'testing123',
        username: 'hello',
        firstName: 'Abc',
        lastName: 'Chang',
        isAdmin: false
    }, {
        email: 'testinguser@fsa.com',
        password: 'fullstack',
        username: 'hello',
        firstName: 'Omri',
        lastName: 'Bernstein',
        isAdmin: false
    }, {
        email: 'animalbuyer@gmail.com',
        password: 'ohdeer',
        username: 'hello',
        firstName: 'Crocodile',
        lastName: 'Dundee',
        isAdmin: false
    }, {
        email: 'workinprogress@gmail.com',
        password: 'almostdone',
        username: 'hello',
        firstName: 'Sean',
        lastName: 'Bert',
        isAdmin: false
    }];

    return User.create(users);

};

var seedProducts = function() {

    var products = [{
        name: 'Tig',
        image: '/js/product/images/1-resized.png',
        price: 100,
        stock: 5,
        category: 'medium',
        tags: ['tiger', 'pig'],
        description: 'this is a mix of a tiger and a pig',
        reviews: ['5718e099fbd5f95b55b86e69']
    }, {
        name: 'Squana',
        image: '/js/product/images/3-resized.png',
        price: 20,
        stock: 50,
        category: 'small',
        tags: ['squirrel', 'iguana'],
        description: 'this is a squirrel mixed with an iguana'
    }, {
        name: 'Catdog',
        image: '/js/product/images/2-resized.png',
        price: 50,
        stock: 10,
        category: 'medium',
        tags: ['dog', 'cat'],
        description: 'this is a cat mixed with a dog'
    }, {
        name: 'Koalasloth',
        image: '/js/product/images/4-resized.png',
        price: 35,
        stock: 15,
        category: 'small',
        tags: ['koala', 'sloth'],
        description: 'this is a koala mixed with a sloth'
    }, {
        name: 'Eleroost',
        image: '/js/product/images/5-resized.png',
        price: 1000,
        stock: 18,
        category: 'large',
        tags: ['chicken', 'elephant'],
        description: 'this is a chicken mixed with an elephant'
    }, {
        name: 'Whiraffe',
        image: '/js/product/images/6-resized.png',
        price: 2500,
        stock: 1,
        category: 'large',
        tags: ['whale', 'giraffe'],
        description: 'this is a whale mixed with a giraffe'
    }, {
        name: 'Camster',
        image: '/js/product/images/7-resized.png',
        price: 3,
        stock: 600,
        category: 'small',
        tags: ['caterpillar', 'hamster'],
        description: 'this is a caterpillar mixed with a hamster'
    }, {
        name: 'Bow',
        image: '/js/product/images/8-resized.png',
        price: 500,
        stock: 17,
        category: 'large',
        tags: ['bear', 'cow'],
        description: 'this is a bear mixed with a cow'
    }, {
        name: 'Pandaroo',
        image: '/js/product/images/9-resized.png',
        price: 120,
        stock: 6,
        category: 'medium',
        tags: ['panda', 'kangaroo'],
        description: 'this is a panda mixed with a kangaroo'
    }, {
        name: 'Camigator',
        image: '/js/product/images/10-resized.png',
        price: 180,
        stock: 11,
        category: 'large',
        tags: ['camel', 'alligator'],
        description: 'this is a camel mixed with an alligator'
    }];

    return Product.create(products);
};

// need address ObjectId's
function seedPaymentInfo() {
    var paymentsInfo = [{
        name: 'Beyonce',
        billingAddress: funAddress._id,
        ccNum: '5', // add validation later
        ccExpiration: '5/5/55' // add validation later
    }, {
        name: 'HOV',
        billingAddress: funAddress._id,
        ccNum: '6',
        ccExpiration: '4/4/55'
    }, {
        name: 'Bill D\'Blasio',
        billingAddress: funAddress._id, // can .ObjectId or ._id if it doesn't recognize the object as an ObjectId
        ccNum: '34',
        ccExpiration: '1/4/105'
    }];
    return PaymentInfo.create(paymentsInfo);
}

function seedAddresses() {
    var addresses = [{
        name: 'TK',
        street: '5 Hanover',
        city: 'NY',
        zipCode: 12234
    }, {
        name: 'TA',
        street: '5 HaDnover',
        city: 'NYC',
        zipCode: 12214
    }];
    return Address.create(addresses);
}

function seedReviews() {
    var reviews = [{
        numStars: 4,
        user: funUser._id,
        product: funProduct._id,
        text: "This is a great thing!"
    }, {
        numStars: 1,
        user: funUser._id,
        product: funProduct._id
    }, {
        numStars: 5,
        user: funUser._id,
        product: funProduct._id
    }];
    return Review.create(reviews);
}

///// this needs to be done when we have ObjectId's for products, addresses, and payments info
function seedPurchases() {
    var purchases = [{
        items: [funProduct._id],
        shippingAddress: funAddress._id,
        paymentInfo: funPaymentInfo._id
    }];
    return Purchase.create(purchases);
}

connectToDb
    .then(function() {
        return wipeCollections();
    })
    .then(function() {
        return seedUsers();
    })
    .then(function() {
        return seedProducts();
    })
    .then(function() {
        return seedAddresses();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function(err) {
        console.error(err);
        process.kill(1);
    });
