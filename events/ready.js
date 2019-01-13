// eslint-disable-next-line no-unused-vars
const Discord = require("discord.js")
var dateFormat = require('dateformat');
var timel = dateFormat(new Date(), "hh:MM:ss:L")

module.exports = bot => {
    console.log(`[${timel}] ${bot.user.username} is ONLINE on ${bot.guilds.size} server(s)!`);
    bot.user.setActivity("loud music.", {type: "LISTENING"})
}