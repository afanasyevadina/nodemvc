const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')

exports.login = passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
})
exports.register = (req, res) => {
    User({
        name: req.body.name,
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save()
    .then(user => {
        req.login((user), err => {
            if(err) return next(err)
            res.redirect('/profile')
        })
    })
    .catch(e => console.log(e))
}
exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}