// Import passport module
const passport = require ("passport")
const User = require("../models/user")

// Define passport OAuth strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy(
    // Now we build our configuration inside this function call
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // the verify callback func
    async function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth
        try {
            // check for the user in our db
            let user = await User.findOne({ googleId: profile.id })
            // if a user is found, provide to passport
            if (user) return cb(null, user)
            // otherwise create a new user to provide passport
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            return cb(null, user)
        } catch (err) {
            return cb(err)
        }
    }
))

// this is the method to serialize our users
passport.serializeUser(function(user, cb) {
    cb(null, user._id)
})

// this is the method to serialize our users
passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId))
})