const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
    console.log(`---cmd: SAY requested by ${message.author.username}`)
}

module.exports.config = {
    name: "say",
    aliases: ["diga"]
}
