const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const classSchema = mongoose.Schema({
  description: String,
  equip: {
    armor: Array,
    gear: Array,
    pack: Array,
    tools: Array,
    weapons: Array
  },
  hp: {
    hitdice: Number,
    hpfirst: Number,
    hplvl: Number
  },
  icon: String,
  name: String,
  namel: String,
  prof: {
    armor: Array,
    savthrows: Array,
    skills: Array,
    tools: Array,
    weapons: Array
  },
  source: String,
  table: {
    1: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    2: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    3: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    4: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    5: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    6: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    7: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    8: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    9: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    10: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    11: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    12: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    13: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    14: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    15: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    16: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    17: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    18: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    19: {
      bonus: Number,
      features: Array,
      lvl: Number
    },
    20: {
      bonus: Number,
      features: Array,
      lvl: Number
    }
  },
  thumb: String
})

module.exports = mongoose.model("classes", classSchema);