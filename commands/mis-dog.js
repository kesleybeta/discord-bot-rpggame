const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    
    let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`);

    let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Good boy")
    .setImage(body.message)
    .setFooter("from Random.dog");
    
    message.channel.send(dogembed);
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}

module.exports.config = {
    name: "doggo",
    aliases: ["dog"]
}