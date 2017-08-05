const fs = require('fs')
const path = require('path')
const url = require('url')
const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash-messages')
const mongoose = require('mongoose')
const homepageRoute = require('./routes/homepage')
const User = require('./models/User')
const formRoute = require('./routes/form')
const loginRoute = require('./routes/login')
mongoose.Promise = require('bluebird')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Make our new app.
const app = express()

// Check if there is an ENV variable and set it as an app variable.
app.set('port', process.env.PORT || 3000)

// Expose the public folder to the internet to serve CSS / Frontend JS
app.use('/public', express.static(path.join(__dirname, 'public')))

// **************** MUSTACHE SETUP ↓

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())

// Turn on default template engine
app.set('view engine', 'mustache')

// Set where we store our views
app.set('views', __dirname + '/views')

// **************** MUSTACHE SETUP ↑

//PASSPORT SETUP
passport.use(
  new LocalStrategy(function(username, password, done) {
    let foundUser;
    User.findOne({ username: username })
      .then(user => {
        if (user) {
          foundUser = user;
          return user.comparePassword(password)
          // return done(null, user)
        } else {
          return done(null, false, { message: 'No user with that username' })
        }
      })
      .then(result => {
        (result) ? done(null, foundUser) : done(null, false, { message: 'Incorrect Password' })
      })
      .catch(err => {
        return done(err)
      })
  })
)

passport.serializeUser(function(user, done) {
  console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Setup Body Parser for forms
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// Setup Express Validator
app.use(expressValidator())

// Log to STDOUT with the dev format
app.use(morgan('dev'))

// Setup a session store using express-session
app.use(
  session({
    secret: 'pikachu',
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Connect to Monogo
require('./dbConnection')

// **************** ROUTES ↓

app.use(homepageRoute)
app.use(formRoute)
app.use(loginRoute)

// **************** ROUTES ↑

// Start the server if run directly
if (require.main === module) {
  // Start a db connect and list after it's connected.

  app.listen(app.get('port'), err => {
    if (err) {
      throw err
      exit(1)
    }

    console.log(
      `Node running in ${app.get('env')} mode @ http://localhost:${app.get(
        'port'
      )}`
    )
  })
}

module.exports = app
