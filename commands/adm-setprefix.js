const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
    await message.delete();
    
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have enough permission.");
    if(!args[0] || args[0 == "help"]) return message.reply(`Usage: ${prefix}setprefix <desired prefix>`);
    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes, null, 2), (err) => {
        if(err) console.log(err)
    });

    let pfembed = new Discord.RichEmbed()
    .setColor("#ccefcb")
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle("Prefix set!")
    .setThumbnail("https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/config.png")
    .setDescription(`Set to ${args[0]}`);
    message.channel.send(pfembed);
    
    console.log(`[CMD] ${message} > requested by [${message.author.username}],[${message.author.id}]`);
}
module.exports.config = {
    name: "setprefix",
    aliases: ["setpfx"]
}
