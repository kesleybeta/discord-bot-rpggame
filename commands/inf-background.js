const Discord = require("discord.js")
// Require lowdb and then FileSync
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jsonBack = low(new FileSync('./jsonfiles/char/charbacks.json', 'utf8'))
const jsonCharCreation = low(new FileSync('./jsonfiles/char/charcreation.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let thisBacks = {}
  let specificBack = ""
  let allBacksEmbed = new Discord.RichEmbed()
    .setColor("#65D8D6")
    .setAuthor("D&D Beyond", "https://i.imgur.com/LaznxhN.png")
    .setDescription(`Every story has a beginning. Your character’s background reveals where you came from, how you became an adventurer, and your place in the world. Your fighter might have been a courageous knight or a grizzled soldier. Your wizard could have been a sage or an artisan. Your rogue might have gotten by as a guild thief or commanded audiences as a jester.`)
    .addField(`BACKGROUNDS`, `\`\`\`diff\n+ ${jsonCharCreation.get('allbacks').value()
    .join('\n+ ')}\`\`\``, true)

  let backsEmbed = new Discord.RichEmbed()
    .setColor("#65D8D6")

  if (!args[0]) return message.channel.send(allBacksEmbed)

  specificBack = args.toString().toLowerCase()
  if (message.content.split(' ').find(el => el === ".full") === ".full") {
    specificBack = await specificBack.split(',')
    specificBack.pop()
    specificBack = await specificBack.join(' ')
  }
  specificBack = await specificBack.split(',').join(' ')

  thisBacks = jsonBack.get(String(specificBack)).value()
  await backsEmbed.setAuthor(thisBacks.name, thisBacks.image.icon)
    .setDescription(thisBacks.description)
    .setThumbnail(thisBacks.image.thumb)

  if (message.content.split(' ').find(el => el === '.full') === '.full') {
    backsEmbed.addField("Starting Equipment", `\`\`\`css
[Gear  ] : ${thisBacks.equip.gear.join(', ') || '---'}
[Tools ] : ${thisBacks.equip.tools.join(', ') || '---'}
\`\`\``, true)
      .addField("Proficiencies", `\`\`\`css
[Skills] : ${thisBacks.prof.skills.join(', ') || '---'}
[Tools ] : ${thisBacks.prof.tools.join(', ') || '---'}
\`\`\``, true)
  }

  return message.channel.send(backsEmbed)
}

module.exports.config = {
  name: "background",
  aliases: [
    "back",
    "backs"
  ]
}