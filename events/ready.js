const Discord = require("discord.js")

module.exports = bot => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} server(s)!`);
    bot.user.setActivity("loud music.", {type: "LISTENING"})
}