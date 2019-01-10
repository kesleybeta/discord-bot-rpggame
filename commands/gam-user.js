const Discord = require("discord.js")
const mongoose = require("mongoose")
const userMod = require("../models/mod-user.js")

module.exports.run = async (bot, message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let embed = new Discord.RichEmbed()
        .setColor("#F0310F")
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle(`Hello **${message.author.username}**, this is your server profile.`)

    userMod.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) console.log(chalk.bgRedBright("[GP01] " + err))
        if (!result) {
            const newUser = new userMod({
                userID: message.author.id,
                userTag: message.author.tag,
                serverID: message.guild.id
            })
            newUser.save().catch(err => console.log(chalk.redBright("[GP02] newProfile.save() > " + err)))

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