const Discord = require("discord.js")
const chalk = require("chalk")

module.exports = bot => {
    console.log(`[LOG] ${bot.user.username} is ` +chalk.bgGreen  ("Online")+ ` on ${bot.guilds.size} server(s)!`);
    bot.user.setActivity("loud music.", {type: "LISTENING"})
}