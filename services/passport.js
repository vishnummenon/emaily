const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// modelClass
const User = mongoose.model('users');

// serializeUser -> generate identifying piece of information for a user and sets into cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    if (user) {
        done(null, user);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                //user already exists. Need not save again
                done(null, existingUser);
            } else {
                // New user. Create a new record in DB
                const newUser = await new User({
                    googleId: profile.id
                }).save();

                done(null, newUser);
            }
        }
    )
);