const Discord = require("discord.js")
const dateFormat = require('dateformat') //https://www.npmjs.com/package/dateformat

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    var wascreated = message.guild.createdAt.toString().split(' ')
    var created = wascreated[1] + ' ' + wascreated[2] + ' ' + wascreated[3]
    var wasjoined = message.guild.joinedAt.toString().split(' ')
    var joined = wasjoined[1] + ' ' + wascreated[2] + ' ' + wascreated[3]

    let serverembed = new Discord.RichEmbed()
        .setDescription("SERVER information")
        .setColor("#15f153")
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL)
        .addField("Server name:", message.guild.name, true)
        .addField("Server Owner:", message.guild.owner, true)
        .addField("Member Count:", message.guild.memberCount, true)
        .addField("Roles Count:", message.guild.roles.last().position + 1, true)
        .addField("Created On:", created, true)
        .addField("You Joined:", joined, true)

    return message.channel.send(serverembed)
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si", "serinf"]
}