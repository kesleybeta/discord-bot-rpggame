const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userID: String,
    userTag: String,
    serverID: String,
    characters: {
        name: String,
        race: String,
        class: String,
        background: String
    }
})

module.exports = mongoose.model("char-profile", profileSchema);