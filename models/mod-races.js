const mongoose = require("mongoose");

const raceSchema = mongoose.Schema({
    allraces: Array,
    Dwarf: {
        description: String,
        abilityscore: { ability: 0 },        
        age: {adult: Number, max: Number},
        alignment: String,
        size: String,        
        speed: 0,
        languages: Array,        
        features: Array,
        subraces: Array,
    }
})

module.exports = mongoose.model("races", raceSchema);