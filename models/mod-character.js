const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const profileSchema = mongoose.Schema({
  userID: String,
  serverID: String,
  characters: {
    alignment: String,
    armorclass: Number,
    attributes: {
      str: {
        base: Number,
        racial: Number,
        mod: Number,
        improve: Number,
        total: Number
      },
      dex: {
        base: Number,
        racial: Number,
        mod: Number,
        improve: Number,
        total: Number
      },
      con: {
        base: Number,
        racial: Number,
        mod: Number,
        improve: Number,
        total: Number
      },
      int: {
        base: Number,
        racial: Number,
        mod: Number,
        improve: Number,
        total: Number
      },
      wis: {
        base: Number,
        racial: Number,
        mod: Number,
        improve: Number,
        total: Number
      },
      cha: {
        base: Number,
        racial: Number,
        mod: Number,
        improve: Number,
        total: Number
      }
    },
    background: String,
    class: String,
    features: Array,
    id: Number,
    inventory: Array,
    hp: {
      hpoints: Number
    },
    level: Number,
    name: String,
    race: String,
    sex: String,
    thumb: String,
    valid: Number
  }
})

module.exports = mongoose.model("charprofile", profileSchema);