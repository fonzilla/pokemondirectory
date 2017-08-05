const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

module.exports = router
