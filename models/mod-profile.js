const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userID: String
})

module.exports = mongoose.model("char-profile", profileSchema);