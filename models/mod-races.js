const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
    abilityscore: {str: Number, dex: Number, con: Number, int: Number, wis: Number, cha: Number },
    age: { adult: Number, max: Number },
    alignment: String,
    description: String,
    edition: String,
    features: Array,
    iconurl: String,
    languages: Array,
    namel: String,
    name: String,
    size: String,
    speed: Number,
    subraces: Array
})

module.exports = mongoose.model("races", raceSchema);