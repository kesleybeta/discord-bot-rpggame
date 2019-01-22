const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
  namel: String,
  name: String,
  abilityscore: {
    str: Number,
    con: Number,
    dex: Number,
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
  subraces: [{
    name: String,
    namel: String,
    abilityscore: {
      str: Number,
      con: Number,
      dex: Number,
      int: Number,
      wis: Number,
      cha: Number
    },
    prof: {
      skill: Array,
      weapon: Array,
      armor: Array,
      tools: Array
    },
    languages: Array
  }],
  variant: Array
})

module.exports = mongoose.model("races", raceSchema);