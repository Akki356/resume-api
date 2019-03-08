const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const uuid = require('express-session')
const mongoStore = require('connect-mongo')(expressSession)

//Config

const config = require(`${__dirname}/./config/config`)

//Database

require(`${__dirname}/.database/connect`)

const app = express()

//Bodyparser

app.use(bodyParser.urlencoded ({
    extended: true,
}))

app.use(bodyParser.json())

//Helmet

const helmetOpts = {
    frameguard: false,
}

app.use(helmet(helmetOpts))

//Express-session and Mongostore

const store = new mongoStore({
    url: config.db.mongodb.session_store_url,
    ttl: config.cookie.validity,
    autoRemove: 'native',
})

const session = {
    key: config.cookie.name,
    secret: config.cookie.secret,
    cookie: {
        path: config.cookie.path,
        maxAge: config.cookie.validity * 1000,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
    name: config.cookie.name,
    genid: function () {
        return uuid() // use UUIDs for session IDs
    },
}

// Add Session to Middleware

app.use(expressSession())

const router = require(`${__dirname}/./routes/router`)
app.use(config.app.prefix,router)

//error handler
const error = require(`${__dirname}/./lib/handlers`).error
app.use(error)

//start server
app.listen(port, () => {
    console.log('Server running on port:', port)
})

module.exports = app
