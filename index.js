const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')
require('./config/passport')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/assets'))
app.use(cookieParser())
app.use(cookieSession({name: "session", keys: ["the_key_to_heart"]}))
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('index')
})
app.use('/', require('./routes/auth'))
app.use('/profile', auth, (req, res) => res.render('profile', {user: req.user}))

mongoose.connect('mongodb+srv://tecedu:teceducis@cluster0.kjfpg.azure.mongodb.net/tasksdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => app.listen(3000))