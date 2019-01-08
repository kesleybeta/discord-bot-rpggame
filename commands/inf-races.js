const Discord = require("discord.js")
const fs = require("fs")
const modRaces = require("../models/mod-races.js")
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'))

function capFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}

module.exports.run = async (bot, message, args, cmd) => {
    await message.delete();
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (!args.toString()) {
        let rEmbed = new Discord.RichEmbed()
            .setTitle("ALL RACES FROM FIFTH EDITION OF THE PLAYER'S HANDBOOK")
            .setColor("#10E0FF")
            .setDescription(`\`\`\`css\n${jsonRaces.allraces.toString().split(",").join(", ")}\`\`\``)
        return message.channel.send(rEmbed)
    }
    if (args.toString()) {
        let specificRace = capFirst(args[0].toString())
        let dembed = new Discord.RichEmbed()
            .setTitle("RACE'S MANUAL")
            .setColor("#5D69D6")

        modRaces.findOne({
            name: specificRace
        }, (err, result) => {
            if (err) console.log("[ERR] " + err)
            if (result === null) return message.reply(`Please, give a valid RACE! \`${cmd} <race>\``)
            if (!result) {
                dembed.setDescription("Couldn't find any information.")
                return message.channel.send(dembed)
            } else {
                dembed
                    .setThumbnail(`${result.iconurl}`)
                    .setDescription(`${result.description}`)
                    .addField("Name", `${result.name} `, true)
                    .addField("Age", `Adult: **${result.age.adult}** | Max: **${result.age.max}** `, true)
                    .addField("Ability score increase", `*STR*: **${result.abilityscore.str}** | *DEX*: **${result.abilityscore.dex}** | *CON*: **${result.abilityscore.con}** | *INT*: **${result.abilityscore.int}** | *WIS*: **${result.abilityscore.wis}** | *CHA*: **${result.abilityscore.cha}**`)
                    .addField("Alignment", `${result.alignment} `, true)
                    .addField("Features", `${result.features} `, true)
                    .addField("Languages", `${result.languages} `, true)
                    .addField("Size", `${result.size} `, true)
                    .addField("Speed", `${result.speed} `, true)
                    .addField("Subraces", `${result.subraces} `, true)
                return message.channel.send(dembed)
            }
        })
    }
}

module.exports.config = {
    name: "races",
    aliases: ["race"]
}
