const express = require('express')
const router = express.Router()
const Pokemon = require('../models/Pokemon')

let typeObj = {
  water: false,
  fire: false,
  electric: false,
  normal: false,
  flying: false,
  bug: false,
  psychic: false,
  grass: false,
  poison: false
}

router.get('/add', (req, res) => {
  for (let prop in typeObj) {
    typeObj[prop] = false
  }
  res.render('form', {
    typeObj: typeObj,
    route: '/add',
    title: 'Add New Pokemon'
  })
})

router.post('/add', (req, res) => {
  req.body.moves = req.body.moves.split(',')
  if (req.body.canEvolve) req.body.canEvolve = true
  new Pokemon(req.body)
    .save()
    .then(result => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/delete', (req, res) => {
  Pokemon.findOneAndRemove({ _id: req.body.button }).then(result => {
    console.log(result)
    res.redirect('/')
  })
})

router.get('/edit/:id', (req, res) => {
  for (let prop in typeObj) {
    typeObj[prop] = false
  }
  Pokemon.find({ _id: req.params.id }).then(result => {
    result[0].moves = result[0].moves.join(', ')
    result[0].type.forEach(el => {
      typeObj[el] = true
    })
    result[0].type = typeObj
    console.log(result[0])
    res.render('form', {
      result: result[0],
      typeObj: typeObj,
      route: '/update/',
      _id: req.params.id,
      title: 'Edit A Pokemon'
    })
  })
})

router.post('/update/:id', (req, res) => {
  req.body.moves = req.body.moves.split(',')
  if (!req.body.canEvolve) req.body.canEvolve = false
  Pokemon.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(result => {
    res.redirect('/')
  })
})

module.exports = router
