const Discord = require("discord.js")
const ModUser = require("../models/mod-user.js")

module.exports.run = async (message, cmd) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    let sender = message.mentions.users.first() || message.author

    let embed = new Discord.RichEmbed()
        .setColor("#DD6655")
        .setTitle(`This is your user information.`)
        .setThumbnail(sender.displayAvatarURL)
        .addField("# Username", `\`\`\`css\n${sender.username}\n\`\`\``, true)
        .addField("# Discriminator", `\`\`\`css\n${sender.discriminator}\n\`\`\``, true)
        .addField("# Tag", `\`\`\`css\n${sender.tag}\n\`\`\``, true)
        .addField("# ID", `\`\`\`css\n${sender.id}\n\`\`\``, true)
        .addField("# Status", `\`\`\`css\n${sender.presence.status}\n\`\`\``, true)
        .addField("# Activity", `\`\`\`css\n${sender.presence.game}\n\`\`\``, true)
        .addField("# LastMessage", `\`\`\`css\n${sender.lastMessage}\n\`\`\``, true)
        .setTimestamp(sender.createdAt.toDateString())
        .setFooter("📨 Created at ")
    ModUser.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) console.log("[GP01] " + err)
        if (result) return message.channel.send(embed)
        if (!result) {
            const newUser = new ModUser({
                userID: message.author.id,
                userTag: message.author.tag,
                serverID: message.guild.id
            })
            newUser.save().catch(err => console.error(err))
            message.channel.send(embed)
            return message.reply("Your user info was saved. Welcome to the database.")
        }
    })
}

module.exports.config = {
    name: "user",
    aliases: ["us"]
}