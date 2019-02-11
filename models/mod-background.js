const mongoose = require("mongoose")
// eslint-disable-next-line new-cap
const backSchema = mongoose.Schema({
  coinstoadd: {
    _container: String,
    bp: Number,
    gp: Number,
    sp: Number
  },
  description: String,
  equip: {
    armor: Array,
    gear: Array,
    pack: Array,
    tools: Array,
    weapons: Array
  },
  features: Array,
  icon: String,
  languages: Array,
  name: String,
  namel: String,
  personality: {
    bond: Number,
    flaw: Number,
    ideal: Number,
    trait: Number
  },
  prof: {
    armor: Array,
    savthrows: Array,
    skills: Array,
    tools: Array,
    weapons: Array
  },
  thumb: String,
  source: String
})

module.exports = mongoose.model("charbackgrounds", backSchema)