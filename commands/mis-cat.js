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
    
    console.log(`[cmd] CAT requested by ${message.author.tag} ID: (${message.author.id})`);
    message.channel.send(dogembed);
}

module.exports.config = {
    name: "cat",
    aliases: []
}