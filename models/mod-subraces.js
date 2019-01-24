const mongoose = require("mongoose");

const subraceSchema = mongoose.Schema({
  racel: String,
  name: String,
  namel: String,
  abilityscore: {
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number
  },
  features: Array,
  prof: {
    skill: Array,
    weapon: Array,
    armor: Array,
    tools: Array
  },
  languages: Array,
  cantrip: Array
})

module.exports = mongoose.model("charsubraces", subraceSchema);