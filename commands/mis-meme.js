const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get(`https://api-to.get-a.life/meme`);

    let dogembed = new Discord.RichEmbed()
    .setColor("#f99f09")
    .setTitle("Menes")
    .setImage(body.url)
    .setFooter("from Get-a.life");
    
    message.channel.send(dogembed);
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}

module.exports.config = {
    name: "meme",
    aliases: ["mene"]
}