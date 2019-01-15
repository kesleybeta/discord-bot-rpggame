const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const classSchema = mongoose.Schema({
    name: String,
    namel: String,
    description: String,
    icon: String,
    thumb: String,
    source: String,
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

module.exports = mongoose.model("classes", classSchema);