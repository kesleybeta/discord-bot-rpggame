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
      bonus: 2,
      features: Array,
      lvl: 1
    },
    2: {
      bonus: 2,
      features: Array,
      lvl: 2
    },
    3: {
      bonus: 2,
      features: Array,
      lvl: 3
    },
    4: {
      bonus: 2,
      features: Array,
      lvl: 4
    },
    5: {
      bonus: 3,
      features: Array,
      lvl: 5
    },
    6: {
      bonus: 3,
      features: Array,
      lvl: 6
    },
    7: {
      bonus: 3,
      features: Array,
      lvl: 7
    },
    8: {
      bonus: 3,
      features: Array,
      lvl: 8
    },
    9: {
      bonus: 4,
      features: Array,
      lvl: 9
    },
    10: {
      bonus: 4,
      features: Array,
      lvl: 10
    },
    11: {
      bonus: 4,
      features: Array,
      lvl: 11
    },
    12: {
      bonus: 4,
      features: Array,
      lvl: 12
    },
    13: {
      bonus: 5,
      features: Array,
      lvl: 13
    },
    14: {
      bonus: 5,
      features: Array,
      lvl: 14
    },
    15: {
      bonus: 5,
      features: Array,
      lvl: 15
    },
    16: {
      bonus: 5,
      features: Array,
      lvl: 16
    },
    17: {
      bonus: 6,
      features: Array,
      lvl: 17
    },
    18: {
      bonus: 6,
      features: Array,
      lvl: 18
    },
    19: {
      bonus: 6,
      features: Array,
      lvl: 19
    },
    20: {
      bonus: 6,
      features: Array,
      lvl: 20
    }
  },
  thumb: String
})

module.exports = mongoose.model("classes", classSchema);