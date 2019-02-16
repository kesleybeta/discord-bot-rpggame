const Discord = require("discord.js")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let diceQtd = Number(args[0])
  let diceSide = Number(args[1])
  // Code lines
  if (diceQtd === 0) return message.reply("\n 😐 I do not have **0** dices! 😬 Please try using more.")
  if (diceQtd > 10) return message.reply("\n 😐 I do not have **" + diceQtd + "** dices! 😬 Please try using less.")
  if (!diceSide) {
    diceSide = diceQtd
    diceQtd = 1
  }
  if (isNaN(diceSide) || isNaN(diceQtd)) return message.reply(" NUMBERS MOTHERFCKR, DO YOU SPEAK IT?")

  let sideFace = 0
  let descr = ""
  let sum = 0
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, "https://game-icons.net/icons/delapouite/originals/png/dice-twenty-faces-twenty.png")
    .setTitle(`You rolled ${diceQtd} D${diceSide}`)

  for (let i = 0; i < diceQtd; i++) {
    sideFace = Math.floor(Math.random() * (diceSide - 1 + 1)) + 1
    descr = descr + `\n#rolled : [ ${sideFace} ]`
    sum = sum + sideFace
  }

  embed.setDescription(`Dice by dice:\n\`\`\`css${descr}\n\`\`\``)
    .addField("Sum of the sides of the dice", `\`\`\`css\n#sum    : [ ${sum} ]\n\`\`\``, true)
  await message.channel.send(embed)
}

module.exports.config = {
  name: "roll",
  aliases: [
    "rl",
    "rola"
  ]
}