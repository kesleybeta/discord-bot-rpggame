const Discord = require("discord.js")

module.exports.run = async (message, cmd, args) => {
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¯\_(ツ)_/¯")
    if(!args[0]) return message.channel.send("¯\\_(ツ)_/¯ *My crystal ball broke, please tell me, how many to clear?*")
    if(isNaN(args[0])) return message.channel.send("¯\\_(ツ)_/¯")
    let toclear = Number(args[0])
    message.channel.bulkDelete(toclear+1).then(() => {
        message.channel.send(`👍 Cleared ${toclear} messages.`).then(msg => msg.delete(2500))
    })
}

module.exports.config = {
    name: "clear",
    aliases: ["cls"]
}
