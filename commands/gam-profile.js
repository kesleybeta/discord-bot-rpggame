const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {
    
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