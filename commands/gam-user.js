const Discord = require("discord.js")
const ModUser = require("../models/mod-user.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    if (String(args)) return message.reply("ERRGAMUSE00 - Please don't use arguments.")

    let embed = new Discord.RichEmbed()
        .setColor("#F0310F")
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle(`This is your server profile.`)

    ModUser.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) console.log("[GP01] " + err)
        if (!result) {
            const newUser = new ModUser({
                userID: message.author.id,
                userTag: message.author.tag,
                serverID: message.guild.id
            })
            newUser.save().catch(err => console.log("[GP02] newProfile.save() > " + err))

            embed
                .addField("ID", `${result.userID}`, true)
            message.channel.send(embed)
        } else {
            embed.addField("ID", `${result.userID}`, true)
            message.channel.send(embed)
        }
    })
}

module.exports.config = {
    name: "user",
    aliases: ["us"]
}