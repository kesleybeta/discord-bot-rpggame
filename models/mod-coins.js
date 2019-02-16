const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const coinSchema = mongoose.Schema({
    userID: String,
    userNm: String,
    serverID: String,
    coins: Number,
    gp: Number,
    sp: Number,
    bp: Number
})

module.exports = mongoose.model("coinsystem", coinSchema);