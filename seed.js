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

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeProducts = Product.remove({});
    var removeAddresses = Address.remove({});
    var removePaymentInfo = PaymentInfo.remove({});
    return Promise.all([
        removeUsers,
        removeProducts,
        removeAddresses,
        removePaymentInfo
    ]);
};

var funAddress;
var funUser;
var funProduct;
var funPaymentInfo;
// var funReview;

var seedUsers = function () {


  Address.create({name: 'Bill', street: '123', city: 'NY', zipCode: 12345})
  .then(function(newAddress){
    funAddress = newAddress;
  });
  User.create({email: 'hello@hello.com', password: '123', isAdmin: true})
  .then(function(newUser){
    funUser = newUser;
  });
  Product.create({name: 'great thing!', price: 1, description: "This is a product description"})
  .then(function(newProduct){
    funProduct = newProduct;
  });
  PaymentInfo.create({name: 'Bill', ccNum: '123', ccExpiration: '05/12'}) // made MM/YY format
  .then(function(newPaymentInfo){
    funPaymentInfo = newPaymentInfo;
  });
  // can't create below because of asynchronicity
  // wanted to use this to test out reviews populating on singleproductpage.html

  // Review.create({numStars: 5, text: 'best genetically modified mutant money can buy', user: funUser._id, product: funProduct._id})
  // .then(function(newReview){
  //   funReview = newReview;
  // });

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: true
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin: true
        },
        {
            email: 'tk@gmail.com',
            password: '123',
            isAdmin: false
        },
        {
            email: 'Iris@gmail.com',
            password: 'abc',
            isAdmin: false
        },
        {
            email: 'Brian@hotmail.com',
            password: 'imdabest',
            isAdmin: false
        },
        {
            email: 'anthony@aol.com',
            password: 'coolbeans',
            isAdmin: false
        },
        {
            email: 'bob@gmail.com',
            password: 'seeding',
            isAdmin: false
        },
        {
            email: 'abc@hotmail.com',
            password: 'testing123',
            isAdmin: false
        },
        {
            email: 'testinguser@fsa.com',
            password: 'fullstack',
            isAdmin: false
        },
        {
            email: 'animalbuyer@gmail.com',
            password: 'ohdeer',
            isAdmin: false
        },
        {
            email: 'workinprogress@gmail.com',
            password: 'almostdone',
            isAdmin: false
        }
    ];

    return User.create(users);

};

var seedProducts = function () {

    var products = [
    {
        name: 'Tig',
        image: 'http://www.fillmurray.com/50/49',
        price: 100,
        stock: 5,
        category: 'medium',
        tags: ['tiger', 'pig'],
        description: 'this is a mix of a tiger and a pig'
        // reviews: [funReview, funReview]
    },
    {
        name: 'Squana',
        image: 'http://www.fillmurray.com/50/48',
        price: 20,
        stock: 50,
        category: 'small',
        tags: ['squirrel', 'iguana'],
        description: 'this is a squirrel mixed with an iguana'
    },
    {
        name: 'Catdog',
        image: 'http://www.fillmurray.com/48/50',
        price: 50,
        stock: 10,
        category: 'medium',
        tags: ['dog', 'cat'],
        description: 'this is a cat mixed with a dog'
    },
    {
        name: 'Koalasloth',
        image: 'http://www.fillmurray.com/49/50',
        price: 35,
        stock: 15,
        category: 'small',
        tags: ['koala', 'sloth'],
        description: 'this is a koala mixed with a sloth'
    },
    {
        name: 'Chickphant',
        image: 'someurl',
        price: 1000,
        stock: 18,
        category: 'large',
        tags: ['chicken', 'elephant'],
        description: 'this is a chicken mixed with an elephant'
    },
    {
        name: 'Whiraffe',
        image: 'someurl',
        price: 2500,
        stock: 1,
        category: 'large',
        tags: ['whale', 'giraffe'],
        description: 'this is a whale mixed with a giraffe'
    },
    {
        name: 'Camster',
        image: 'someurl',
        price: 3,
        stock: 600,
        category: 'small',
        tags: ['caterpillar', 'hamster'],
        description: 'this is a caterpillar mixed with a hamster'
    },
    {
        name: 'Bow',
        image: 'someurl',
        price: 500,
        stock: 17,
        category: 'large',
        tags: ['bear', 'cow'],
        description: 'this is a bear mixed with a cow'
    },
    {
        name: 'Pandaroo',
        image: 'someurl',
        price: 120,
        stock: 6,
        category: 'medium',
        tags: ['panda', 'kangaroo'],
        description: 'this is a panda mixed with a kangaroo'
    },
    {
        name: 'Camigator',
        image: 'someurl',
        price: 180,
        stock: 11,
        category: 'large',
        tags: ['camel', 'alligator'],
        description: 'this is a camel mixed with an alligator'
    }
    ];

    return Product.create(products);
};

// need address ObjectId's
function seedPaymentInfo(){
  var paymentsInfo = [
    {
      name: 'Beyonce',
      billingAddress: funAddress._id,
      ccNum: '5', // add validation later
      ccExpiration: '5/5/55' // add validation later
    },
    {
      name: 'HOV',
      billingAddress: funAddress._id,
      ccNum: '6',
      ccExpiration: '4/4/55'
    },
    {
      name: 'Bill D\'Blasio',
      billingAddress: funAddress._id, // can .ObjectId or ._id if it doesn't recognize the object as an ObjectId
      ccNum: '34',
      ccExpiration: '1/4/105'
    }
  ];
  return PaymentInfo.create(paymentsInfo);
}

function seedAddresses(){
  var addresses = [
    {
      name: 'TK',
      street: '5 Hanover',
      city: 'NY',
      zipCode: 12234
    },
    {
      name: 'TA',
      street: '5 HaDnover',
      city: 'NYC',
      zipCode: 12214
    }
  ];
  return Address.create(addresses);
}

function seedReviews(){
  var reviews = [
    {
      numStars: 4,
      user: funUser._id,
      product: funProduct._id
    },
    {
      numStars: 1,
      user: funUser._id,
      product: funProduct._id
    },
    {
      numStars: 5,
      user: funUser._id,
      product: funProduct._id
    }
  ];
  return Review.create(reviews);
}

///// this needs to be done when we have ObjectId's for products, addresses, and payments info
function seedPurchases(){
  var purchases = [
    {
      items: [funProduct._id],
      shippingAddress: funAddress._id,
      paymentInfo: funPaymentInfo._id
    }
  ];
  return Purchase.create(purchases);
}

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedProducts();
    })
    .then(function(){
      return seedPaymentInfo();
    })
    .then(function(){
      return seedAddresses();
    })
    .then(function(){
      return seedReviews();
    })
    .then(function(){
      return seedPurchases();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
