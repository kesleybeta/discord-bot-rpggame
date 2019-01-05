const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
    
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}

module.exports.config = {
    name: "say",
    aliases: ["diga"]
}
