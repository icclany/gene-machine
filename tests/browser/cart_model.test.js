'use strict';
var expect = require('chai').expect;
var User = mongoose.model('User');

describe('User', function () {

    /**
     * Your model should have two fields (both required): `title` and `content`.
     *
     * http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
     */

    it('has username and email fields of type String', function (done) {

        var testUser = new User({
            email: 'testing@gmail.com',
            username: 'testingUser',
            firstName: 'Iris',
            lastName: 'Chang'
        });

        testUser.save().then(function (savedUser) {
            expect(savedUser.email).to.equal('testing@gmail.com');
            expect(savedUser.username).to.equal('testingUser');
            done();
        }).then(null, done);

    });

    it('requires last name', function (done) {

        var testUser = new User({
            email: 'testing@gmail.com',
            username: 'testingUser',
            firstName: 'Iris'
        });

        testUser.validate(function (err) {
            expect(err).to.be.an('object');
            expect(err.message).to.equal('User validation failed');
            done();
        });

    });

    it('has an instance method to get purchases of the user', function (done) {

        User.findOne({ username: 'testingUser' }).exec().then(function (user) {
            expect(user.getPurchases()).to.equal('Nothing');
            done();
        }).then(null, done);

    });

});
