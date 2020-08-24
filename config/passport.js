const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: "login"
}, (username, password, done) => {
    User.findOne({login: username}, (err, user) => {
        if(err) return done(err)
        if(!user) return done(null, false, {message: "Incorrect login"})
        if(!bcrypt.compareSync(password, user.password)) return done(null, false, {message: "Incorrect password"})
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})