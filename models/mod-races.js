const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const raceSchema = mongoose.Schema({
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
  icon: String,
  languages: Array,
  mark: Array,
  name: String,
  namel: String,
  names: {
    family: Array,
    female: Array,
    male: Array
  },
  raceonly: Object,
  size: String,
  source: String,
  subraces: Array,
  speed: {
    flying: Number,
    swimming: Number,
    walking: Number
  },
  thumb: String,
  variant: Array
})

module.exports = mongoose.model("charraces", raceSchema);