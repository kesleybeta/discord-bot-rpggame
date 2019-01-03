const Discord = require("discord.js")
const chalk = require("chalk")

module.exports = bot => {
    console.log(chalk.green(`[LOG] ${bot.user.username} is ONLINE on ${bot.guilds.size} server(s)!`));
    bot.user.setActivity("loud music.", {type: "LISTENING"})
}