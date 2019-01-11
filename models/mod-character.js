const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
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