const Discord = require("discord.js")
const fs = require("fs")
const modRaces = require("../models/mod-races.js")
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'))

module.exports.run = async (bot, message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let stembed = new Discord.RichEmbed()
        .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setColor("#808080")
        .setDescription("— To start your new adventure I'll need your card number...\n— *Haha! Just kidding, this doesn't exist here...\n— ...cofcof (yet)\n— So...*\n\n▼ **Let's create your new CHARACTER.**\n")
    message.channel.send(stembed)

    let rEmbed = new Discord.RichEmbed()
        .setTitle("1. CHOOSE YOUR CHARACTER'S RACE")
        .setColor("#00D0FF")
        .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
        .setDescription("► Every character belongs to a race.\n► The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.")
        .setFooter("You'll have [um tanto aí] seconds to type your desired race.")

    let tudo = []
    modRaces.find({
        edition: "5th"
    }).sort([
        ['name', 'descending']
    ]).exec((err1, res) => {
        if (err1) {
            message.reply("GS01 - Contact the dev.")
            return console.log("[GS01] " + err1)
        }
        if (res.length === 0) return message.reply("GS02 - Contact the dev")
        if (res === null) return message.reply("GS03 - Contact the dev")
        if (!res) {
            rEmbed.setFooter("From JSON file.").addField(`↘ Choose`, jsonRaces.allraces.join(', '), true)
            return message.channel.send(rEmbed)
        } else {
            try {
                tudo.push(res[0].name)
            } catch (err4) {
                return message.reply("GS04 - Contact the dev")
            }
            for (i = 1; i < res.length; i++)
                tudo.unshift(res[i].name)

            rEmbed.addField(`↙ Choose`, `***${tudo.join('\n')}***`, true)
            return message.channel.send(rEmbed)
        }
    })
}

module.exports.config = {
    name: "start",
    aliases: []
}

// alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼