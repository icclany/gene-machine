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

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');

var wipeCollections = function () {
    var removeUsers = User.remove({});
    return Promise.all([
        removeUsers
    ]);
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            email: 'tk@gmail.com',
            password: '123'
        },
        {
            email: 'Iris@gmail.com',
            password: 'abc'
        },
        {
            email: 'Brian@hotmail.com',
            password: 'imdabest'
        },
        {
            email: 'anthony@aol.com',
            password: 'coolbeans'
        },
        {
            email: 'bob@gmail.com',
            password: 'seeding'
        },
        {
            email: 'abc@hotmail.com',
            password: 'testing123'
        },
        {
            email: 'testinguser@fsa.com',
            password: 'fullstack'
        },
        {
            email: 'animalbuyer@gmail.com',
            password: 'ohdeer'
        },
        {
            email: 'workinprogress@gmail.com',
            password: 'almostdone'
        }
    ];

    return User.create(users);

};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
