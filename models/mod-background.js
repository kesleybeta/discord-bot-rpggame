const mongoose = require("mongoose")
// eslint-disable-next-line new-cap
const backSchema = mongoose.Schema({
    bond: Array,
    description: String,
    equipment: Array,
    features: Array,
    flaw: Array,
    ideal: Array,
    languages: String,
    name: String,
    namel: String,
    personality: Array,
    skillprof: Array,
    source: String,
    thumb: String,
    toolprof: Array
})

module.exports = mongoose.model("backgrounds", backSchema)