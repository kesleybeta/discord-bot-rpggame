const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
  namel: String,
  name: String,
  abilityscore: {
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number
  },
  age: {
    adult: Number,
    max: Number
  },
  alignment: String,
  description: String,
  features: Array,
  languages: Array,
  icon: String,
  thumb: String,
  size: String,
  source: String,
  speed: {
    walking: Number,
    flying: Number,
    swimming: Number
  },
  prof: {
    skill: String,
    weapon: Array,
    armor: Array,
    tools: Array
  },
  subraces: [],
  variant: Array
})

module.exports = mongoose.model("races", raceSchema);