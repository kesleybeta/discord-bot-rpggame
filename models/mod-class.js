const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const raceSchema = mongoose.Schema({
    name: String,
    namel: {
        type: String,
        text: true
    },
    description: String,
    iconurl: String,
    table: {
        lvl: Number,
        bonus: Number,
        features: Array
    },
    hp: {
        hitdice: Array,
        hpfirst: Array,
        hplvl: Array
    },
    prof: {
        armor: Array,
        weapons: Array,
        tools: Array,
        savthrows: Array,
        skills: Array
    },
    equipment: Array
})

module.exports = mongoose.model("classes", raceSchema);