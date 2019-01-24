module.exports.run = async (message, cmd, args) => {
    // Logging
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    // Code
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("¯\_(ツ)_/¯")
    if (!args[0]) return message.channel.send("¯\\_(ツ)_/¯ *My crystal ball broke, please tell me, how many to clear?*")
    if (isNaN(args[0])) return message.channel.send("¯\\_(ツ)_/¯")
    let toclear = args[0]
    if (toclear > 100) return message.channel.send("Value should be less than or equal to 100")
    await message.channel.bulkDelete(toclear + 1).then(() => {
        message.channel.send(`👍 Cleared **${toclear}** messages.`).then(msg => msg.delete(2500))
    })
}

module.exports.config = {
    name: "clear",
    aliases: ["cls"]
}