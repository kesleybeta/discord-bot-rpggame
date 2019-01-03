const mongoose = require("mongoose");

const coinSchema = mongoose.Schema({
    userID: String,
    userNm: String,
    serverID: String,
    coins: Number
})

module.exports = mongoose.model("coinsystem", coinSchema);