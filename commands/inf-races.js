const Discord = require("discord.js")
const fs = require("fs")
const modRaces = require("../models/mod-races.js")
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'))

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (!args.toString()) {
        let rEmbed = new Discord.RichEmbed()
            .setTitle("ALL RACES FROM FIFTH EDITION OF THE PLAYER'S HANDBOOK")
            .setColor("#10E0FF")
        //.setDescription(`\`\`\`css\n${jsonRaces.allraces.toString().split(",").join(", ")}\`\`\``)

        let tudo = []
        modRaces.find({
                edition: "5th"
            }).sort([
                [
                    'name',
                    'descending'
                ]
            ])
            .exec((err, res) => {
                if (err) return console.log('erro' + err)
                tudo.push(res[0].name)
                for (let i = 1; i < res.length; i++) tudo.unshift(res[i].name)

                rEmbed.setDescription(`\`\`\`diff\n+ ${tudo.join('\n+ ')}\`\`\``)
                return message.channel.send(rEmbed)
            })
    } else {
        let specificRace = args.toString().toLowerCase()
            .split(",")
            .join(" ")
        let dembed = new Discord.RichEmbed()
            .setTitle("RACE'S MANUAL")
            .setColor("#5D69D6")

        modRaces.findOne({
            namel: specificRace
        }, (err, result) => {
            if (err) console.log("[2] " + err)
            if (result === null) return message.reply(`Please, give a valid RACE! Type \`${cmd}\` to see the race's list.`)
            if (!result) {
                dembed.setDescription("Couldn't find any information.")
                return message.channel.send(dembed)
            } else {
                dembed
                    .setThumbnail(`${result.iconurl}`)
                    .setDescription(`${result.description}`)
                    .addField("Name", `***${result.name}*** `, true)
                    .addField("Age", `**Adult**: ***${result.age.adult}*** | **Max**: ***${result.age.max}*** `, true)
                    //.addField("Ability score increase", `**STR**: ***${result.abilityscore.str}*** | **DEX**: ***${result.abilityscore.dex}*** | **CON**: ***${result.abilityscore.con}*** | **INT**: ***${result.abilityscore.int}*** | **WIS**: ***${result.abilityscore.wis}*** | **CHA**: ***${result.abilityscore.cha}***`)
                    .addField("Alignment", `***${result.alignment}*** `, true)
                    .addField("Size", `***${result.size}*** `, true)
                    .addField("Speed", `***${result.speed}*** `, true)
                    .addField("Languages", `***${result.languages.join(', ')}*** `, true)
                    .addField("Features", `***${result.features.join(', ')}*** `)
                    .addField("Subraces", `***${result.subraces.join(', ')}*** `)
                return message.channel.send(dembed)
            }
        })
    }
}

module.exports.config = {
    name: "races",
    aliases: ["race"]
}