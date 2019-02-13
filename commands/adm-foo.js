/* eslint-disable operator-assignment */
const Discord = require("discord.js")
const tools = require("../util/functions") // Require global functions
const ModCharacter = require("../models/mod-character") // Require profile schema
const low = require('lowdb') // Require lowdb and then FileSync
const FileSync = require('lowdb/adapters/FileSync')
const jsonCharCreation = low(new FileSync('./jsonfiles/charcreation.json', 'utf8'))
const jsonRaces = low(new FileSync('./jsonfiles/char/charraces.json', 'utf8'))
const jsonSubRaces = low(new FileSync('./jsonfiles/char/charsubraces.json', 'utf8'))
const capitalize = require("capitalize")

module.exports.run = async (message, cmd, args) => {
  await message.delete()

  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

  // Variables
  let server = message.guild
  let sender = message.author
  const filter = msg => msg.author.id === sender.id
  let milisec = 30000 // Global time of wait

  // Character variables
  let salva = false
  let choosenRace = "notdefined"
  let choosenSubRace = "notdefined"
  let choosenClass = "notdefined"
  let choosenBack = "notdefined"
  let choosenName = "notdefined"

  let alignment = ''
  let features = []
  let racialAttributes = []
  let base = { // Base ability score
    str: tools.rollfourdsix(),
    dex: tools.rollfourdsix(),
    con: tools.rollfourdsix(),
    int: tools.rollfourdsix(),
    wis: tools.rollfourdsix(),
    cha: tools.rollfourdsix()
  }
  let mod = { // Modifier
    str: tools.modifier(base.str),
    dex: tools.modifier(base.dex),
    con: tools.modifier(base.con),
    int: tools.modifier(base.int),
    wis: tools.modifier(base.wis),
    cha: tools.modifier(base.cha)
  }

  // Building Rich Embeds
  let raceEmbed = new Discord.RichEmbed() // An embed for races information
    .setAuthor("Character Creation", "https://i.imgur.com/1MeVhf4.png")
    .setTitle("1. RACE")
    .setColor("#9665D8")
    .setThumbnail("https://i.imgur.com/nA9JmZH.png")
    .setDescription(`• The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.`)
    .addField(`↙ Choose one:`, `\`\`\`diff\n+ ${jsonCharCreation.get('allraces').value().join('\n+ ')}\`\`\``, true)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired RACE.`)
  let subRaceEmbed = new Discord.RichEmbed() // An embed for subraces information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("1.5. SUB-RACE")
    .setColor("#9776E9")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Viking-512.png")
    .setDescription(`• Some races have subraces. Members of a subrace have the traits of the parent race in addition to the traits specified for their subrace.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired SUBRACE.`)

  // Code lines
  /** 0. Searching for user characters */
  await ModCharacter.findOne({
    userID: sender.id,
    serverID: server.id,
    'characters.valid': true
  }).exec(async (err, doc) => {
    if (err) return message.reply("ERR#GAMNEW01 - An error occurred. Try contacting the dev.").then(console.log('[ERR01] ' + err.message))

    /** 1 - 1. Sending race embed */
    if (!doc || doc === null) await message.channel.send(raceEmbed)
    else if (doc.characters.valid === true) return message.reply(`• You already have a character. ► HIS NAME: *${doc.characters.name}*`)
  })

  /** 1 - 2. Message awaiting race choice */
  await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(async collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content) choosenRace = await collected.first().content.toLowerCase()

      /**  1 - 3. Race validation */
      if (choosenRace !== "notdefined") {
        if (!jsonRaces.has(choosenRace).value()) return message.reply("Race is not defined!")
        // Getting the races traits
        racialAttributes = await jsonRaces.get(choosenRace + '.abilityscore').value()
        alignment = await capitalize.words(jsonRaces.get(choosenRace + '.alignment').value())
        features = await jsonRaces.get(choosenRace + '.features').value()

        if (jsonRaces.get(choosenRace + '.subraces').value() === "") choosenSubRace = ""
        else {
          choosenSubRace = "choose"
          try { // Building the SUBRACES embed.
            await subRaceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${jsonCharCreation.get('subraces.' + choosenRace).value().join('\n+ ')}\`\`\``, true)
          } catch (ce) {
            return message.reply("An error occurred. Try again later.").then(console.error(ce))
          }
        }
        choosenRace = capitalize.words(choosenRace)
      }
    })
    .catch(() => {
      choosenRace = "notdefined"
      return message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.error)
    })
  // If the race is not correctly chosen return error.
  if (choosenRace === "notdefined") return

  /** 1.5 - 2. Message await - this will wait for user to type the desire race. */
  if (choosenSubRace === "choose") {
    await message.channel.send(subRaceEmbed)
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: milisec,
        errors: ['time'],
      }).then(async collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!").then(choosenSubRace = "notdefined")
        if (collected.first().content) choosenSubRace = await collected.first().content.toLowerCase()

        /** 1.5 - 3. Validation of the choice - if SUBRACE is valid the guide keep going. */
        if (choosenRace !== "notdefined") {
          try {
            if (!jsonSubRaces.has(choosenSubRace).value()) {
              choosenSubRace = "terminate"
              return message.reply(`\n• Please, give a valid SUBRACE!\n• Restart the guide typing: \`${cmd}\`.`)
            }

            await features.push(jsonSubRaces.get(choosenSubRace + '.features').value())
            let subRaceAbility = await jsonSubRaces.get(choosenSubRace + '.abilityscore').value()

            racialAttributes.str += subRaceAbility.str
            racialAttributes.dex += subRaceAbility.dex
            racialAttributes.con += subRaceAbility.con
            racialAttributes.int += subRaceAbility.int
            racialAttributes.wis += subRaceAbility.wis
            racialAttributes.cha += subRaceAbility.cha

            choosenSubRace = jsonSubRaces.get(choosenSubRace + '.name').value()
          } catch (err) {
            choosenSubRace = "terminate"
            return message.channel.send(`\n• Time's up!\n• Restart the guide typing: \`${cmd}\`.`).then(console.error(err))
          }
        }
      })
      .catch(ce => {
        choosenSubRace = "terminate"
        message.channel.send(`\n• Time's up!\n• Restart the guide typing: \`${cmd}\`.`).then(console.error(ce))
      })
  }
  if (choosenSubRace === "terminate") return // ----------------------------------------------------------------------

  return message.channel.send(`\`\`\`css
  RACE       : ${choosenSubRace || choosenRace}
  ---
  FEATURES   : ${features}
  ATTRIBUTES : STR: ${racialAttributes.str}, DEX: ${racialAttributes.dex}, CON: ${racialAttributes.con}, INT: ${racialAttributes.int}, WIS: ${racialAttributes.wis}, CHA: ${racialAttributes.cha}
  \`\`\``)
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}

// const attachment = new Discord.Attachment('./card_images/sample.png', 'sample.png');
// const embed = new RichEmbed()
//         .setTitle('Wicked Sweet Title')
//         .attachFile(attachment)
//         .setImage('attachment://sample.png');
// message.channel.send({embed}).catch(console.error)