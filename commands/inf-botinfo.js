const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    await message.delete();

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("BOT information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot name", bot.user.username)
    .addBlankField()
    .addField("Created On", bot.user.createdAt);

    console.log(`---cmd: BOTINFO requested by ${message.author.username}`)
    message.channel.send(botembed);
}

module.exports.config = {
    name: "botinfo",
    aliases: []
}