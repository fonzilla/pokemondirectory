const mongoose = require("mongoose")

let pokeSchema = mongoose.Schema({
  name: String,
  origin: {
    city: String,
    country: String
  },
  type: [{
    type: String,
    enum: ["water", "fire", "electric", "normal", "flying", "bug", "psychic", "grass", "poison"],
    required: true
  }],
  owner: String,
  level: {
    type: Number,
    min: 1,
    max: 100
  },
  moves: [String],
  canEvolve: Boolean
});

module.exports = mongoose.model("pokemon", pokeSchema);
