const Discord = require("discord.js")
const superagent = require("superagent")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let {
        body
    } = await superagent
        .get(`https://api-to.get-a.life/meme`)

    let embed = new Discord.RichEmbed()
        .setColor("#f99f09")
        .setTitle("Menes")
        .setImage(body.url)
        .setFooter("from Get-a.life")
    message.channel.send(embed)
}

module.exports.config = {
    name: "meme",
    aliases: ["mene"]
}