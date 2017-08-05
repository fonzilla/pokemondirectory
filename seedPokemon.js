const Pokemon = require('./server/models/Pokemon')
require('./server/dbConnection')

let newPokemon = [
  {
    name: 'Pikachu',
    origin: {
      city: 'Pallet Town',
      country: 'USA'
    },
    type: ['electric'],
    owner: 'Alf',
    level: 19,
    moves: ['tackle', 'shock'],
    canEvolve: true
  },
  {
    name: 'Squirtle',
    origin: {
      city: 'Cerulean City',
      country: 'Japan'
    },
    type: ['water'],
    owner: 'Misty',
    level: 24,
    moves: ['water gun', 'tackle', 'headbutt'],
    canEvolve: true
  },
  {
    name: 'Pidgeot',
    origin: {
      city: 'Pewter City',
      country: 'Australia'
    },
    type: ['flying', 'normal'],
    owner: 'Brock',
    level: 57,
    moves: ['whirlwind', 'fly', 'peck'],
    canEvolve: false
  },
  {
    name: 'Alakazam',
    origin: {
      city: 'Ghost Town',
      country: 'USA'
    },
    type: ['psychic'],
    owner: 'Alf',
    level: 89,
    moves: ['confusion', 'psychic beam'],
    canEvolve: false
  },
  {
    name: 'Venonat',
    origin: {
      city: 'Mt Moon',
      country: 'USA'
    },
    type: ['bug', 'poison'],
    owner: 'Misty',
    level: 36,
    moves: ['tackle', 'poison', 'bite'],
    canEvolve: true
  }
]

newPokemon.forEach(pokemon => {
  new Pokemon(pokemon)
    .save()
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
})
