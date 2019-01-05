const Discord = require("discord.js");
const fs = require("fs");
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'));

module.exports.run = async (bot, message, args, cmd) => {
    await message.delete();
    console.log(`[CMD] ${cmd.slice(1)} [MSG] ${args || "empty"} | requested by: [${message.author.tag}]`);

    let rEmbed = new Discord.RichEmbed()
    .setTitle("RACES FROM FIFTH EDITION OF THE PLAYER'S HANDBOOK")
    .setColor("#10E0FF")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    //.addBlankField()
    .addField(`🧙`, jsonRaces.allraces.toString().replaceAll(',', ', '), true);
    
    return message.channel.send(rEmbed);
}

module.exports.config = {
    name: "races",
    aliases: ["race"]
}
