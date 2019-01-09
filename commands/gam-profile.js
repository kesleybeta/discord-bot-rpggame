const Discord = require("discord.js")
const mongoose = require("mongoose")

module.exports.run = async (bot, message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle(`Hello ${message.author.username}`)
        .addField(`Your`, `character`)

    message.channel.send(embed)
}

module.exports.config = {
    name: "profile",
    aliases: ["p"]
}