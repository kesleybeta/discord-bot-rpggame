const Discord = require("discord.js")
const dateFormat = require('dateformat') //https://www.npmjs.com/package/dateformat

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let date = dateFormat(new Date(), "dddd, mmmm dS, yyyy")
    let botembed = new Discord.RichEmbed()
        .setDescription("BOT information")
        .setColor("#15f153")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Bot name", bot.user.username, true)
        .addField("Created On", date, true)
        .addField("Developed by","Kesley", true)
        .addField("Idealized by","Lucas", true)
        .setFooter("© LuKe-SN")

    message.channel.send(botembed)
}

module.exports.config = {
    name: "botinfo",
    aliases: ["info"]
}