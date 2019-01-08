const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userID: String,
    userTag: String,
    serverID: String,
    characters: { type: Object }
})

module.exports = mongoose.model("char-profile", profileSchema);