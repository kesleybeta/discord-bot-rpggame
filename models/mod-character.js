const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const profileSchema = mongoose.Schema({
  _id: Number,
  userID: String,
  serverID: String,
  characters: {
    armorclass: Number,
    attributes: {
      str: { base: Number, racial: Number, mod: Number, improve: Number, total: Number },
      dex: { base: Number, racial: Number, mod: Number, improve: Number, total: Number },
      con: { base: Number, racial: Number, mod: Number, improve: Number, total: Number },
      int: { base: Number, racial: Number, mod: Number, improve: Number, total: Number },
      wis: { base: Number, racial: Number, mod: Number, improve: Number, total: Number },
      cha: { base: Number, racial: Number, mod: Number, improve: Number, total: Number }
    },
    basicinfo: { alignment: String, name: String, background: String, class: String, race: String },
    equipment: { gear: Array, weapon: Array, armor: Array },
    features: Array,
    hp: { hitdice: Number, perlevel: Number, max: Number },
    image: {icon: String, portrait: String },
    level: Number,
    speed: { walking: String, running: String, swimming: String },
    _valid: Boolean
  }
})

module.exports = mongoose.model("charprofile", profileSchema);