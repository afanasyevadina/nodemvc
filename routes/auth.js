const express = require('express')
const authController = require('../controllers/authController')
const authRouter = express.Router()
authRouter.get('/login', (req, res) => {
    res.render('login')
})
authRouter.post('/login', authController.login)
authRouter.get('/register', (req, res) => {
    res.render('register')
})
authRouter.post('/register', authController.register)
authRouter.get('/logout', authController.logout)
module.exports = authRouter
