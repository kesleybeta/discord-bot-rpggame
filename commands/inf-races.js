const Discord = require("discord.js")
// Require lowdb and then FileSync
const capitalize = require("capitalize")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jsonRace = low(new FileSync('./jsonfiles/char/charraces.json', 'utf8'))
const jsonSubRace = low(new FileSync('./jsonfiles/char/charsubraces.json', 'utf8'))
const jsonCharCreation = low(new FileSync('./jsonfiles/char/charcreation.json', 'utf8'))

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
    .setDescription(`Every character belongs to a race, one of the many intelligent humanoid species in the D&D world. The most common player character races are dwarves, elves, halflings, and humans. Some races also have subraces, such as mountain dwarf or wood elf. This Races section provides more information about these races.`)
    .addField(`RACES`, `\`\`\`diff\n+ ${jsonCharCreation.get('allraces').value()
    .join('\n+ ')}\`\`\``, true)

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

  if (!jsonRace.has(String(specificRace)).value()) return message.reply(`Please give a valid RACE. Type \`${cmd}\` to see the full list of races.`)
  thisRace = jsonRace.get(String(specificRace)).value()

  await raceEmbed.setAuthor(thisRace.name, thisRace.image.icon)
    .setDescription(thisRace.description)
    .setThumbnail(thisRace.image.thumb)

  if (message.content.split(' ').find(el => el === '.full') === '.full') {
    raceEmbed.addField("Ability Score Increase", `\`\`\`css
CHA: + ${thisRace.abilityscore.cha}    CON: + ${thisRace.abilityscore.con}
DEX: + ${thisRace.abilityscore.dex}    INT: + ${thisRace.abilityscore.int}
STR: + ${thisRace.abilityscore.str}    WIS: + ${thisRace.abilityscore.wis}
\`\`\``, true)
      .addField("Features", `\`\`\`css\n${thisRace.features.join(', ') || "---"}\n\`\`\``, true)
      .addField("Racial Traits", `\`\`\`css
[Age      ] : Adult : ${thisRace.traits.age.adult}   Max   : ${thisRace.traits.age.max}
[Alignment] : Most commonly <${thisRace.traits.alignment}>
[Languages] : ${thisRace.traits.languages.join(', ')}
[Size     ] : ${capitalize.words(thisRace.traits.size)} size
[Speed    ] : Your base speed is ${thisRace.traits.speed.walking} feet
\`\`\``, true)
    // "subraces": "",
  }

  if (thisRace.subraces !== "") {
    raceEmbed.addField("Subraces", `\`\`\`css\n${thisRace.subraces.join(', ') || "---"}\n\`\`\``, true)
  }

  return message.channel.send(raceEmbed)
}

module.exports.config = {
  name: "races",
  aliases: ["race"]
}