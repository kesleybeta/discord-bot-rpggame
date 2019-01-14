const Discord = require("discord.js")
const ModClass = require("../models/mod-class.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (!args.toString()) {
        let embed = new Discord.RichEmbed()
            .setTitle("Class is the primary definition of what your character can do.")
            .setColor("#70D8EE")

        let classArray = []
        ModClass.find({
                //edition: "5th"
            }).sort([
                [
                    'name',
                    'descending'
                ]
            ])
            .exec((err, res) => {
                if (err) return console.log('erro' + err)
                classArray.push(res[0].name)
                for (let i = 1; i < res.length; i++) classArray.unshift(res[i].name)

                embed.setDescription(`\`\`\`diff\n+ ${classArray.join('\n+ ')}\`\`\``)
                return message.channel.send(embed)
            })
    } else {
        let specificClass = args.toString().toLowerCase()
            .split(",")
            .join(" ")
        let cembed = new Discord.RichEmbed()
            .setTitle("RACE'S MANUAL")
            .setColor("#4E23E5")

        ModClass.findOne({
            namel: specificClass
        }, (err, result) => {
            if (err) console.log("[2] " + err)
            if (result === null) return message.reply(`Please, give a valid CLASS! Type \`${cmd}\` to see the classes's list.`)
            if (!result) {
                cembed.setDescription("Couldn't find any information.")
                return message.channel.send(cembed)
            } else {
                cembed
                    .setThumbnail(`${result.iconurl}`)
                    .setDescription(`${result.description}`)
                    .addField("Name", `***${result.name}*** `, true)
                return message.channel.send(cembed)
            }
        })
    }
}

module.exports.config = {
    name: "class",
    aliases: ["classes"]
}