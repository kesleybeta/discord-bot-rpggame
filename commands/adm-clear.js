const Discord = require("discord.js");
const chalk = require ("chalk");

module.exports.run = async (bot, message, args, cmd) => {
    console.log('[CMD ' +chalk.inverse(`${cmd.slice(1)}`)+ '] [ARG '+ chalk.inverse(`${args || "empty"}`)+ `] [requested by: ${message.author.tag}]`);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¯\_(ツ)_/¯");
    if(!args[0]) return message.channel.send("¯\\_(ツ)_/¯ *My crystal ball broke, please tell me, how many to clear?*");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2500));
    });
}

module.exports.config = {
    name: "clear",
    aliases: ["cls"]
}
