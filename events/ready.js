// eslint-disable-next-line no-unused-vars
const Discord = require("discord.js")

module.exports = bot => {
    console.log(`[LOG] ${bot.user.username} is ONLINE on ${bot.guilds.size} server(s)!`);
    bot.user.setActivity("loud music.", {type: "LISTENING"})
}