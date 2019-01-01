const Discord = require("discord.js")

module.exports = bot => {
    bot.user.setActivity("nothing.", {type: "PLAYING"})
    console.log(`[EVT] Disconnected at ${new Date()}`);
}