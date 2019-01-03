const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args, prefix) => {
    await message.delete();

    let embed = new Discord.RichEmbed()
    .setColor("#000000")
    .setThumbnail(message.author.displayAvatarURL)
    .setTitle(`Hello ${message.author.username}`)
    .addField(`Your`,`character`);

    message.channel.send(embed);
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}

module.exports.config = {
    name: "profile",
    aliases: ["p"]
}