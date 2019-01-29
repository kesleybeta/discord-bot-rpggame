const Discord = require("discord.js")
const CoinMod = require("../models/mod-coins.js")
const moneyHook = new Discord.WebhookClient('537710849008074754', 'Nr_a6RXlTeV24o8B4JtiwPqDcdiOzJGVQmbXq6Tj8iHkAgYozJToFohITmiI07ErtjOb');

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  let target = message.mentions.users.first() || message.author
  let embed = new Discord.RichEmbed()
    .setAuthor(`${target.username}'s pouch:`, `${target.displayAvatarURL}`)
    .setColor("#62c65f")
    .setThumbnail("https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/money-icon-dollar-512.png")

  CoinMod.findOne({
    userID: target.id,
    serverID: message.guild.id
  }, (err, res) => {
    if (err) console.log("[ERR] " + err)
    if (!res) {
      embed.addField(`\`💰\``, `\`\`\`diff\n+ Coins:  0\n+ Gold:   0 pieces\n+ Silver: 0 pieces\n+ Bronze: 0 pieces\n\`\`\``)
      return moneyHook.send(embed).catch(console.error)
    } else {
      embed.addField(`\`💰\``, `\`\`\`md\n+ Coins  : ${res.coins}\n+ Gold   : 0 pieces\n+ Silver : 0 pieces\n+ Bronze : 0 pieces\`\`\``)
      return moneyHook.send(embed).catch(console.error)
    }
  })
}

module.exports.config = {
  name: "coins",
  aliases: ["coin"]
}