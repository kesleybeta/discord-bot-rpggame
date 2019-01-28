const Discord = require("discord.js")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let diceQtd = args[0]
  let diceSide = args[1]
  // Code lines
  if (!isNaN(diceSide)) {
    let sideFace = 0
    let descr = ""

    let embed = new Discord.RichEmbed()
      .setAuthor(`You rolled a D${diceSide}`, "https://game-icons.net/icons/delapouite/originals/png/dice-twenty-faces-twenty.png")

    for (let i = 0; i < diceQtd; i++) {
      sideFace = Math.floor(Math.random() * (diceSide - 1 + 1)) + 1
      descr = descr + `\nYou got a > **${sideFace}**`
    }

    message.channel.send(embed.setDescription(descr))

  } else {
    return message.reply("¯\\_(ツ)_/¯")
  }
}

module.exports.config = {
  name: "roll",
  aliases: [
    "rl",
    "rola"
  ]
}