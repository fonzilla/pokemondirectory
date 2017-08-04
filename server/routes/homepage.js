const express = require("express");
const router = express.Router();
const Pokemon = require('../models/Pokemon');

router.get("/", (req, res) => {
  Pokemon.find()
  .then((result)=>{
    res.render('index', { pokemon: result });
  })
});

module.exports = router;
