const Discord = require("discord.js")
const fs = require("fs")
const modRaces = require("../models/mod-races.js")
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'))

module.exports.run = async (bot, message, args, cmd) => {
    await message.delete();
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (!args.toString()) {
        let rEmbed = new Discord.RichEmbed()
            .setTitle("ALL RACES FROM FIFTH EDITION OF THE PLAYER'S HANDBOOK")
            .setColor("#10E0FF")
            .setDescription(`\`\`\`css\n${jsonRaces.allraces.toString().split(",").join(", ")}\`\`\``)

        //return message.channel.send(rEmbed)
        modRaces.find({edition: "5th" }).then(function (res) {
            let tudo = []
            tudo.push(res[0].name)
            for(i=1;i < res.length-1; i++)
                tudo.unshift(res[i].name)
            });
            console.log(tudo)
    }

    if (args.toString()) {
        let specificRace = args.toString().toLowerCase().split(",").join(" ")
        console.log(specificRace)
        let dembed = new Discord.RichEmbed()
            .setTitle("RACE'S MANUAL")
            .setColor("#5D69D6")

        modRaces.findOne({
            namel: specificRace
        }, (err, result) => {
            if (err) console.log("[2] " + err)
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
