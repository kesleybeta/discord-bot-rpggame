const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const utilSchema = mongoose.Schema({
    name: String,
    pointscost: Array,
    modifiers: {
        score: Array
    },
    summary: {
        str: {
            measures: String,
            importantfor: String,
            racialincreases: String
        },
        dex: {},
        con: {},
        int: {},
        wis: {},
        cha: {}
    }
})

module.exports = mongoose.model("utils", utilSchema);