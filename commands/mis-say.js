const Discord = require("discord.js")

module.exports.run = async (bot, message, cmd, args) => {
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (!message.member.hasPermission("ADMINISTRATOR")) return
    const sayMessage = args.join(" ")
    message.delete().catch(err => console.log("[say] "+err))
    message.channel.send(sayMessage)
}

module.exports.config = {
    name: "say",
    aliases: ["diga"]
}