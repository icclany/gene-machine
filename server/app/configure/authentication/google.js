'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleCredentials = {
        clientID: '773488430488-i89elpco22hlr1mmob9o8hiiqvb7eh8m.apps.googleusercontent.com',
        clientSecret: 'GJAczToVWXhb2y9d_LoHDJKw',
        callbackURL: 'http://127.0.0.1:1337/auth/google/callback' // ??????????
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {


        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        google: {
                            id: profile.id
                        },
                        email: profile.emails[0].value,
                        isAdmin: false,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

};
