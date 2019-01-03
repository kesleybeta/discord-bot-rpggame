const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
    races: Array,
    Genasi: {subraces: Array}
})

module.exports = mongoose.model("races", raceSchema);