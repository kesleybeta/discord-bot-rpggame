const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userID: String,
    userTag: String,
    serverID: String
})

module.exports = mongoose.model("users", profileSchema);