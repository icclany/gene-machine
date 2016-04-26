// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('Administrator Permissions:', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    describe('Non-administrator agent', function() {

        it('should not be able to create products', function(done) {
            agent.post('/api/products', { name: 'ELCHAPO', price:100000000 }).expect(404).end(done);
        });
    });

    describe('Administrator agent', function() {

        var adminAgent;

        var userInfo = {
            email: 'admin@gmail.com',
            password: 'password',
            firstName: 'Security',
            lastName: 'Force',
            isAdmin: true
        };

        beforeEach('Create a user', function(done) {
            User.create(userInfo, done);
        });

        beforeEach('Log in as administrator', function(done) {
            agent.post('/login').send(userInfo).end(done);
        });

        xit('should be able to create products', function(done) {
            agent.post('/api/products', {name: 'TheNewGuy', price:500}).expect(200).end(done);
        });
    });
});
