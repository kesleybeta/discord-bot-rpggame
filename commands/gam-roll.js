const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var diceQtd = args[0];
    var diceSide = args[1];

    if (!isNaN(diceSide)) {
        let sideFace;
        let descr = "";

        let embed = new Discord.RichEmbed()
            .setAuthor(`You rolled a D${diceSide}`, "https://game-icons.net/icons/delapouite/originals/png/dice-twenty-faces-twenty.png");

        for (let i = 0; i < diceQtd; i++) {
            sideFace = Math.floor(Math.random() * (diceSide - 1 + 1)) + 1;
            descr = descr +  "\nYou got a > "+`${sideFace}`
        }

        message.channel.send(embed.setDescription(descr));

    } else {
        return message.reply("¯\\_(ツ)_/¯")
    }
    console.log(`[CMD] ${message} requested by ${message.author.tag} ID: (${message.author.id})`);
}

module.exports.config = {
    name: "roll",
    aliases: []
}