const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, prefix) => {
    
    let helemb = new Discord.RichEmbed()
    //.setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
    .setColor("#008080")    
    .setThumbnail("https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
    .setTitle(`Hello ${message.author.username}`)
    .addField(`I am the *Game Master*. I'm here to guide you on your adventure. \n Well, If you are ready type **${prefix}start**`)

    message.channel.send(helemb);
    console.log(`---cmd: HELLO requested by ${message.author.username}`);
}
module.exports.config = {
    name: "hello",
    aliases: []
}