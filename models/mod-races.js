const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
    name: String,
    description: String,
    abilityscore: {str: Number, dex: Number, con: Number, int: Number, wis: Number, cha: Number },
    age: { adult: Number, max: Number },
    alignment: String,
    size: String,
    speed: Number,
    languages: Array,
    features: Array,
    subraces: Array
})

module.exports = mongoose.model("races", raceSchema);