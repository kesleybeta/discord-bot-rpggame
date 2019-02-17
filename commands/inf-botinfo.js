const Discord = require("discord.js")

// eslint-disable-next-line max-params
module.exports.run = async (message, cmd, args, bot) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    let cateChannels = []
    let textChannels = []
    let voiceChannels = []
    let allGuilds = []
    bot.channels.map(el => {
        if (el.type === 'text' && el.name !== 'undefined') textChannels.push(el.name)
        return null
    })
    bot.channels.map(el => {
        if (el.type === 'voice' && el.name !== 'undefined') voiceChannels.push(el.name)
        return null
    })
    bot.channels.map(el => {
        if (el.type === 'category' && el.name !== 'undefined') cateChannels.push(el.name)
        return null
    })
    bot.guilds.map(el => allGuilds.push(el.name))

    let botembed = new Discord.RichEmbed()
        .setColor("#15F153")
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(`BOT information\`\`\`css
Bot name : [ ${bot.user.username} ]
Online on: [ ${bot.guilds.size} guilds ]
Ready at : [ ${bot.readyAt.toDateString()} ]
Ping     : [ ${bot.ping} ]
User     : [ ${bot.users.size} users ]
\`\`\``)
        .addField("Channels", `\`\`\`css
${cateChannels.length} Categories
${textChannels.length} Text channels     
${voiceChannels.length} Voice channels
\`\`\``)
        .addField("Creators", `\`\`\`css
Idealized by : [ LukeDaHunter ]
Developed by : [ Jarkax ]
\`\`\``)
        .setFooter("© LuKe-SN")

    if (args[0] === 'full') {
        botembed.addField(`Categories`, `\`\`\`fix\n${cateChannels.join(', ')}\n\`\`\``, true)
            .addField(`Text channels`, `\`\`\`fix\n${textChannels.join(', ')}\n\`\`\``, true)
            .addField(`Voice channels`, `\`\`\`fix\n${voiceChannels.join(', ')}\n\`\`\``, true)
            .addField(`Where I am`, `\`\`\`fix\n${allGuilds.slice(0, 10).join(', ')}\n\`\`\``, true)
    }
    return message.channel.send(botembed)
}

module.exports.config = {
    name: "botinfo",
    aliases: ["info"]
}