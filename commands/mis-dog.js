const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`);

    let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Good boy")
    .setImage(body.message)
    .setFooter("from Random.dog");
    
    console.log(`[cmd] DOG requested by ${message.author.tag} ID: (${message.author.id})`);
    message.channel.send(dogembed);
}

module.exports.config = {
    name: "doggo",
    aliases: ["dog"]
}