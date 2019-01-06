const Discord = require("discord.js");
const fs = require("fs");
const modRaces = require("../models/mod-races.js");
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'));

module.exports.run = async (bot, message, args, cmd) => {    
    console.log(`[CMD] '${cmd.slice(1)}' [MSG] '${args}' > requested by: [${message.author.username}]`);
    await message.delete();
    let stembed = new Discord.RichEmbed()
        .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setColor("#808080")
        .setDescription("— To start your new adventure I'll need your card number...\n— *Haha! Just kidding, this doesn't exist here...\n— ...cofcof (yet)\n— So...*\n\n▼ **Let's create your new CHARACTER.**");
    message.channel.send(stembed);

    // let rEmbed = new Discord.RichEmbed()
    //     .setTitle("1. CHOOSE YOUR CHARACTER'S RACE")
    //     .setColor("#00D0FF")
    //     .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    //     .setDescription("► Every character belongs to a race.\n► The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.")
    //     .setFooter("You'll have 10 seconds to type your desired race.")
    //     .addBlankField();

    // try {
    //     modRaces.find({
    //         //_id: "5c2d54fbb47fbb35d05210c1"
    //     }, (err, races) => {
    //         if (err) console.log("[ERR] " + err);
    //         if (!races) {
    //             rEmbed.addField("↙ Choose", "No races found", true);
    //             const newcoll = new modRaces({
    //                 allraces: "Dragonborn"
    //             })
    //             newcoll.save().catch(err => console.log(chalk.redBright("[ERR] newcoll.save() > " + err)));
    //             return message.channel.send(rEmbed);
    //         } else {
    //             rEmbed.addField(`↙ Choose`, races.races.toString().split(','), true);
    //             return message.channel.send(rEmbed);
    //         }
    //     })
    // } catch (err) { console.log(err) } finally {
    //     rEmbed.setFooter("From JSON file.");
    //     rEmbed.addField(`↙ Choose`, jsonRaces.allraces.toString().split(','), true);
    //     return message.channel.send(rEmbed);
    // }

}

module.exports.config = {
    name: "start",
    aliases: []
}

// alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼