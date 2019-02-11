const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const profileSchema = mongoose.Schema({
    userID: String,
    userTag: String,
    serverID: String
})

module.exports = mongoose.model("users", profileSchema);