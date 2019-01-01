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
    
    console.log(`[cmd] MEME requested by ${message.author.tag} ID: (${message.author.id})`);
    message.channel.send(dogembed);
}

module.exports.config = {
    name: "meme",
    aliases: ["mene"]
}