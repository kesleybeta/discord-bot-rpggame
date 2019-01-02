const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get(`https://aws.random.cat/meow`);

    let dogembed = new Discord.RichEmbed()
    .setColor("#ff99ff")
    .setTitle("Human enemy")
    .setImage(body.file)
    .setFooter("from Random.cat");
    
    message.channel.send(dogembed);
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}

module.exports.config = {
    name: "cat",
    aliases: []
}