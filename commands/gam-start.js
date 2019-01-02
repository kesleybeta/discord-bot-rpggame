const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    
    let jsonraces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", "utf8"));
    
    let stembed = new Discord.RichEmbed()
    .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
    .setColor("#808080")
    .setDescription("To start your new adventure I'll need your card number...\n*Haha! Just kidding, this doesn't exist here...\n...cofcof (yet)\nSo...*\n\nLet's create your new CHARACTER.");
    message.channel.send({embed: stembed});
    
    // - -- - --adicionar racial traits + outro raças
    let rcembed = new Discord.RichEmbed()
    .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
    .setDescription("**>** Every character belongs to a race.\n**>** The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.")
    .setColor("#808088")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .addBlankField()
    .addField("CHOOSE YOUR CHARACTER'S RACE:", jsonraces["races"], true)
    message.channel.send(rcembed);

    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}

module.exports.config = {
    name: "start",
    aliases: []
}
