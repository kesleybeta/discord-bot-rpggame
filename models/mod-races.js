const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
    abilityscore: {
        str: Number,
        dex: Number,
        con: Number,
        int: Number,
        wis: Number,
        cha: Number
    },
    age: {
        adult: Number,
        max: Number
    },
    alignment: String,
    description: String,
    features: Array,
    icon: String,
    thumb: String,
    languages: Array,
    namel: String,
    name: String,
    size: String,
    source: String,
    speed: String,
    subraces: [
        {
            name: String,
            namel: String
        }
    ]
})

module.exports = mongoose.model("races", raceSchema);