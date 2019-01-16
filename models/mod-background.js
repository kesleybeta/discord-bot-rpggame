const mongoose = require("mongoose")
// eslint-disable-next-line new-cap
const backSchema = mongoose.Schema({
    name: String,
    namel: String,
    source: String,
    thumb: String,
    description: String,
    fulldescrip: String,
    features: Array,
    skillprof: Array,
    toolprof: Array,
    languages: String,
    equipment: Array,
    personality: Array,
    ideal: Array,
    bond: Array,
    flaw: Array
})

module.exports = mongoose.model("backgrounds", backSchema)