const Discord = require("discord.js");
const mongoose = require("mongoose");
const CoinMod = require("../models/mod-coins.js");

mongoose.connect("mongodb://localhost:27017/Coins", {
    useNewUrlParser: true
})

module.exports.run = async (bot, message, args) => {
    await message.delete();
    CoinMod.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, coins) => {
        let embed = new Discord.RichEmbed()
            .setTitle("Coins")
            .setColor("#4000FF")
            .setThumbnail(message.author.displayAvatarURL);
        if (!coins) {
            embed.addField("You have", "0 coins", true);
            return message.channel.send(embed);
        } else {
            embed.addField("You have", coins.coins + " coins", true)
            return message.channel.send(embed);
        }
    })
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}
module.exports.config = {
    name: "coins",
    aliases: []
}



