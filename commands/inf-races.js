const Discord = require("discord.js")
// Require lowdb and then FileSync
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jsonRace = low(new FileSync('./jsonfiles/char/charraces.json', 'utf8'))
const jsonCharCreation = low(new FileSync('./jsonfiles/charcreation.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let thisRace = {}
  let specificRace = ""
  let allRacesEmbed = new Discord.RichEmbed()
    .setColor("#9665D6")
    .setAuthor("D&D Beyond", "https://i.imgur.com/LaznxhN.png")
    .setDescription(``)
    .addField(`RACES`, `\`\`\`diff\n+ ${jsonCharCreation.get('allraces').value().join('\n+ ')}\`\`\``, true)

  let raceEmbed = new Discord.RichEmbed()
    .setColor("#9665D6")

  if (!args[0]) return message.channel.send(allRacesEmbed)

  specificRace = args.toString().toLowerCase()
  if (message.content.split(' ').find(el => el === ".full") === ".full") {
    specificRace = await specificRace.split(',')
    specificRace.pop()
    specificRace = await specificRace.join(' ')
  }
  specificRace = await specificRace.split(',').join(' ')

  thisRace = jsonRace.get(String(specificRace)).value()

  await raceEmbed.setAuthor(thisRace.name, thisRace.image.icon)
    .setDescription(thisRace.description)
    .setThumbnail(thisRace.image.thumb)

  if (message.content.split(' ').find(el => el === '.full') === '.full') {
    raceEmbed.addField("Ability Score Increase", `\`\`\`css
CHA: + ${thisRace.abilityscore.cha}
CON: + ${thisRace.abilityscore.con}
DEX: + ${thisRace.abilityscore.dex}
INT: + ${thisRace.abilityscore.int}
STR: + ${thisRace.abilityscore.str}
WIS: + ${thisRace.abilityscore.wis}
\`\`\``, true)
      .addField("Features", `\`\`\`css\n${thisRace.features.join(', ')}\n\`\`\``, true)
      .addField("Racial Traits", `\`\`\`json
"traits": {
  "age": {
    "adult": 0,
    "max": 0
  },
  "alignment": "",
  "languages": [],
  "size": "",
  "speed": {
    "flying": 0,
    "swimming": 0,
    "walking": 0
  }
}
    \`\`\``, true)
    // "subraces": "",
  }
  return message.channel.send(raceEmbed)
}

module.exports.config = {
  name: "races",
  aliases: ["race"]
}