const Discord = require("discord.js")
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let helemb = new Discord.RichEmbed()
        //.setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setColor("#008080")
        .setThumbnail("https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setTitle(`Hello ${message.author.username}`)
        .addField(`I am the *Game Master*. I'm here to guide you on your adventure. \n Well, If you are ready type **${cmd}start**`)

    message.channel.send(helemb)
}
module.exports.config = {
    name: "hello",
    aliases: []
}