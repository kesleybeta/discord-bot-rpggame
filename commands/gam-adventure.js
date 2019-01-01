const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let adembed = new Discord.RichEmbed()
    .setTitle("Player: " + `${message.author.name}`)
    .setColor("#000000");

    switch (args.toString()) {
        case "1":
            message.reply("you chose the Adventure #1");
            adembed.setDescription("It's almost dawn, you're in a tavern drinking alone after a long day of jobs done...")
            
        break;
        
        case 2:
            message.reply("Adventure 2");
        break;
    
        default: return;
    }
    message.channel.send(adembed);

    console.log(`[CMD] ${message} requested by ${message.author.tag} ID: (${message.author.id})`);
}

module.exports.config = {
    name: "adventure",
    aliases: ["a", "adv"]
}