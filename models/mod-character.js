const mongoose = require("mongoose");
// eslint-disable-next-line new-cap
const profileSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    characters: {
        id: Number,
        valid: Number,
        name: String,
        race: String,
        class: String,
        background: String,
        alignment: String,
        attributes: {
            str: {
                base: Number,
                racial: Number,
                mod: Number,
                total: Number
            },
            dex: {
                base: Number,
                racial: Number,
                mod: Number,
                total: Number
            },
            con: {
                base: Number,
                racial: Number,
                mod: Number,
                total: Number
            },
            int: {
                base: Number,
                racial: Number,
                mod: Number,
                total: Number
            },
            wis: {
                base: Number,
                racial: Number,
                mod: Number,
                total: Number
            },
            cha: {
                base: Number,
                racial: Number,
                mod: Number,
                total: Number
            }
        },
        hp: {
            hpoints: Number
        },
        level: Number,
        sex: String,
        thumb: String
    }
})

module.exports = mongoose.model("charprofile", profileSchema);