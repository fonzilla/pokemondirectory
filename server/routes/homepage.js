const express = require("express");
const router = express.Router();
const Pokemon = require('../models/Pokemon');

router.get("/", (req, res) => {
  console.log("--------REQUSER--------", req.user);
  Pokemon.find()
  .then((result)=>{
    res.render('index', { pokemon: result, user: req.user });
  })
});

module.exports = router;
