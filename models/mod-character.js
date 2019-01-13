const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const profileSchema = mongoose.Schema({
    userID: String,
    userTag: String,
    serverID: String,
    characters: {
        id: Number,
        valid: Number,
        name: String,
        race: String,
        class: String,
        background: String,
        attributes: {
            str: Number,
            con: Number,
            dex: Number,
            int: Number,
            wis: Number,
            cha: Number
        }
    }
})

module.exports = mongoose.model("char-profile", profileSchema);