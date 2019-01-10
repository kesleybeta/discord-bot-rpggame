const Discord = require("discord.js")
const CoinMod = require("../models/mod-coins.js")

module.exports.run = async (bot, message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    CoinMod.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, coins) => {
        if (err) console.log("[ERR] " + err)

        let embed = new Discord.RichEmbed()
            .setTitle("Coins")
            .setColor("#FFDF00")
            .setThumbnail(message.author.displayAvatarURL)

        if (!coins) {
            embed.addField("You have", "0 coins", true)
            return message.channel.send(embed).then(msg => msg.delete(5000))
        } else {
            embed.addField("You have", coins.coins + " coins", true)
            return message.channel.send(embed).then(msg => msg.delete(5000))
        }
    })
}
module.exports.config = {
    name: "coins",
    aliases: ["coin"]
}