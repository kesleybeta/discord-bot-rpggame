const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const modRaces = require("../models/mod-races.js");
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'));

module.exports.run = async (bot, message, args, cmd) => {
    //await message.delete();
    let specificRace = args[0].toString();
    console.log(`[CMD] ${cmd.slice(1)} [MSG] ${args.toString() || "empty"} | requested by: [${message.author.tag}]`);

    if (!args.toString()) {
        let rEmbed = new Discord.RichEmbed()
            .setTitle("ALL RACES FROM FIFTH EDITION OF THE PLAYER'S HANDBOOK")
            .setColor("#10E0FF")
            .setDescription(`\`\`\`css\n${jsonRaces.allraces.toString().split(",").join(", ")}\`\`\``);

        return message.channel.send(rEmbed);
    } 
    if(args.toString()) {
        console.log(args);
        let dembed = new Discord.RichEmbed()
            .setTitle("RACE'S MANUAL")
            .setColor("#DD69D6");           

        modRaces.find({}, (err, races) => {
            if (err) console.log("[ERR] " + err);
            console.log(races)
            if (!races) {
                dembed.setDescription("Couldn't find any information.")
                return message.channel.send(dembed)
            } else {
                //console.log(races.raceslist)

                //dembed.setTitle(races.name.toString())//.setDescription(races.description.toString());
                return message.channel.send(dembed);
            }
        })
    }
}

module.exports.config = {
    name: "races",
    aliases: ["race"]
}
