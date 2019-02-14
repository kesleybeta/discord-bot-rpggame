/* eslint-disable operator-assignment */
const Discord = require("discord.js")
const tools = require("../util/functions") // Require global functions
const ModCharacter = require("../models/mod-character") // Require profile schema
const low = require('lowdb') // Require lowdb and then FileSync
const FileSync = require('lowdb/adapters/FileSync')

const jsonCharCreation = low(new FileSync('./jsonfiles/charcreation.json', 'utf8'))
const jsonRaces = low(new FileSync('./jsonfiles/char/charraces.json', 'utf8'))
const jsonSubRaces = low(new FileSync('./jsonfiles/char/charsubraces.json', 'utf8'))
const jsonClass = low(new FileSync('./jsonfiles/char/charclasses.json', 'utf8'))
const jsonBackground = low(new FileSync('./jsonfiles/char/charbackgrounds.json', 'utf8'))

const capitalize = require("capitalize")

module.exports.run = async (message, cmd) => {
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
  let choosenRace = "choose"
  let choosenSubRace = ""
  let choosenClass = "choose"
  let choosenBack = "choose"
  let choosenName = "choose"

  let alignment = ""
  let equip = {}
  let features = []
  let hp = ""
  let languages = []
  let name = ""
  let racialAttributes = {}
  let prof = {}
  let speed = {}

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
  let embed = new Discord.RichEmbed()
  let raceEmbed = new Discord.RichEmbed() // An embed for races information
    .setAuthor("Character Creation", "https://i.imgur.com/1MeVhf4.png")
    .setTitle("1. RACE")
    .setColor("#9665D8")
    .setThumbnail("https://i.imgur.com/nA9JmZH.png")
    .setDescription(`• The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.`)
    .addField(`↙ Choose one:`, `\`\`\`diff\n+ ${jsonCharCreation.get('allraces').value().join('\n+ ')}\`\`\``, true)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired RACE. Or 'cancel'`)
  let subRaceEmbed = new Discord.RichEmbed() // An embed for subraces information
    .setAuthor("Character Creation", "https://i.imgur.com/1MeVhf4.png")
    .setTitle("1.5. SUB-RACE")
    .setColor("#8666EF")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Viking-512.png")
    .setDescription(`• Some races have subraces. Members of a subrace have the traits of the parent race in addition to the traits specified for their subrace.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired SUBRACE. Or 'cancel'`)
  let classEmbed = new Discord.RichEmbed() // An embed for class information
    .setAuthor("Character Creation", "https://i.imgur.com/1MeVhf4.png")
    .setTitle("2. CLASS")
    .setColor("#65d8d6")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png")
    .setDescription(`• Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.`)
    .addField(`↙ Choose one`, `\`\`\`diff\n+ ${jsonCharCreation.get('allclasses').value().join('\n+ ')}\`\`\``, true)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired CLASS. Or 'cancel`)
  let backgroundEmbed = new Discord.RichEmbed() // An embed for background information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("3. CHARACTER'S BACKGROUND")
    .setColor("#69db83")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Grim_Reaper-512.png")
    .setDescription(`• Your character’s background reveals where you came from, how you became an adventurer, and your place in the world.`)
    .addField(`↙ Choose one`, `\`\`\`diff\n+ ${arr.get('allbacks').value().join('\n+ ')}\`\`\``, true)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired BACKGROUND.`)
  let nameEmbed = new Discord.RichEmbed()
    .setColor(3447003)
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("4. CHARACTER's NAME")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`• Choose a ***name*** for your character.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type.`)

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
    if (collected.first().content.toLowerCase() === "cancel") return message.reply(" • Cancelled!").then(choosenRace = "terminate")
    if (collected.first().content) choosenRace = await collected.first().content.toLowerCase()

    /**  1 - 3. Race validation */
    if (!jsonRaces.has(choosenRace).value()) return message.reply(`\n• Please, give a valid RACE!\n• Restart the guide typing: \`${cmd}\`.`).then(choosenRace = "terminate")

    // Getting the races traits
    alignment = await capitalize.words(jsonRaces.get(choosenRace + '.alignment').value())
    features = await jsonRaces.get(choosenRace + '.features').value()
    languages = await jsonRaces.get(choosenRace + '.languages').value()
    name = tools.randomName(choosenRace, 'm')
    racialAttributes = await jsonRaces.get(choosenRace + '.abilityscore').value()
    speed = await jsonRaces.get(choosenRace + '.speed').value()

    if (jsonRaces.get(choosenRace + '.subraces').value() === "") choosenSubRace = ""
    else {
      choosenSubRace = "choose"
      try { // Building the SUBRACES embed.
        await subRaceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${jsonCharCreation.get('subraces.' + choosenRace).value()
          .join('\n+ ')}\`\`\``, true)
      } catch (ce) {
        return message.reply("An error occurred. Try again later.").then(console.error(ce.message))
      }
    }
    choosenRace = capitalize.words(choosenRace)

  })
    .catch(ce => {
      choosenRace = "terminate"
      return message.reply(` • Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.error(ce.message))
    })
  if (choosenRace === "terminate") return // --------------------------------------------------------------------

  /** Subrace */
  if (choosenSubRace === "choose") {
    await message.channel.send(subRaceEmbed)
    await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(async collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply(" • Cancelled!").then(choosenSubRace = "terminate")
      if (collected.first().content) choosenSubRace = await collected.first().content.toLowerCase()

      if (!jsonSubRaces.has(choosenSubRace).value()) return message.reply(`\n• Please, give a valid SUBRACE!\n• Restart the guide typing: \`${cmd}\`.`).then(choosenSubRace = "terminate")

      // Subrace traits
      await features.push(jsonSubRaces.get(choosenSubRace + '.features').value())
      let subRaceAbility = await jsonSubRaces.get(choosenSubRace + '.abilityscore').value()
      racialAttributes.str += subRaceAbility.str
      racialAttributes.dex += subRaceAbility.dex
      racialAttributes.con += subRaceAbility.con
      racialAttributes.int += subRaceAbility.int
      racialAttributes.wis += subRaceAbility.wis
      racialAttributes.cha += subRaceAbility.cha
      // Capitalize the string
      choosenSubRace = jsonSubRaces.get(choosenSubRace + '.name').value()

    })
      .catch(ce => {
        choosenSubRace = "terminate"
        return message.reply(`\n• Time's up!\n• Restart the guide typing: \`${cmd}\`.`).then(console.error(ce.message))
      })
  }
  if (choosenSubRace === "terminate") return // --------------------------------------------------------------------

  /** Class */
  await message.channel.send(classEmbed)
  await message.channel.awaitMessages(filter, {
    max: 1,
    time: milisec,
    errors: ['time']
  }).then(async collected => {
    if (collected.first().content.toLowerCase() === "cancel") return message.reply(" • Cancelled!").then(choosenClass = "terminate")
    if (collected.first().content) choosenClass = await collected.first().content.toLowerCase()

    if (!jsonClass.has(choosenClass).value()) return message.reply(`\n• Please, give a valid CLASS!\n• Restart the guide typing: \`${cmd}\`.`).then(choosenClass = "terminate")

    // Class features
    await features.push(jsonClass.get(choosenClass + '.table.1.features').value())
    equip = await jsonClass.get(choosenClass + '.equip').value()
    prof = await jsonClass.get(choosenClass + '.prof').value()
    hp = await jsonClass.get(choosenClass + '.hp.hpfirst').value() + mod.con
    features = features.flat()

    choosenClass = capitalize.words(choosenClass)
  })
    .catch(ce => {
      choosenClass = "terminate"
      return message.reply(`\n• Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.error(ce.message))
    })

  if (choosenClass === "terminate") return

  /** Background */
  await message.channel.send(backgroundEmbed)
  await message.channel.awaitMessages(filter, {
    max: 1,
    time: milisec,
    errors: ['time']
  }).then(async collected => {
    if (collected.first().content.toLowerCase() === "cancel") return message.reply(" • Cancelled!").then(choosenBack = "terminate")
    if (collected.first().content) choosenBack = await collected.first().content.toLowerCase()

    if (!jsonBackground.has(choosenBack).value()) return message.reply(`\n• Please, give a valid BACKGROUND!\n• Restart the guide typing: \`${cmd}\`.`).then(choosenBack = "terminate")

    // // Background features
    // await features.push(jsonBackground.get(choosenClass + '.table.1.features').value())
    // equip = await jsonClass.get(choosenClass + '.equip').value()
    // prof = await jsonClass.get(choosenClass + '.prof').value()
    // hp = await jsonClass.get(choosenClass + '.hp.hpfirst').value() + mod.con
    // features = features.flat()
    // "coinstoadd": {
    //   "_container": "belt pouch",
    //     "bp": 0,
    //       "gp": 10,
    //         "sp": 0
    // },
    // "equip": {
    //   "armor": [],
    //     "gear": ["shovel", "iron pot", "common clothes", "belt pouch"],
    //       "pack": [],
    //         "tools": ["artisan"],
    //           "weapons": []
    // },
    // "features": ["rustic hospitality"],
    //   "languages": [],

    //     "personality": {
    //   "bond": 6,
    //     "flaw": 6,
    //       "ideal": 6,
    //         "trait": 8
    // },

    // "prof": {
    //   "armor": [],
    //     "savthrows": [],
    //       "skills": ["animal handling", "survival"],
    //         "tools": ["artisan", "vehicles.land"],
    //           "weapons": []

    choosenBack = capitalize.words(choosenBack)
  })
    .catch(ce => {
      choosenBack = "terminate"
      return message.channel.send(`\n• Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.log("[ERR15] " + ce))
    })

  // 3 - 3. Validation of the choice - if BACKGROUND is valid the guide keep going.
  // if (choosenBack !== 'notdefined') {
  //   await ModBack.findOne({
  //     namel: choosenBack
  //   }, (e, background) => {
  //     if (e) console.log("[ERR16] " + e)
  //     if (background === null) {
  //       choosenBack = "notdefined"
  //       return message.reply(`\n• Please, give a valid BACKGROUND! • Restart the guide typing: \`${cmd}\`.`)
  //     }
  //     if (!background) return message.channel.send("Couldn't find any information.")
  //     else 
  //   })
  // } else return

  if (choosenBack === "terminate") return











  embed.setColor("#447FF3")
    .addField("NAME", `\`\`\`css\n${name}\n\`\`\``, true)
    .addBlankField()
    .addField("RACE", `\`\`\`css\n${choosenSubRace || choosenRace}\n\`\`\``, true)
    .addField("CLASS", `\`\`\`css\n${choosenClass}\n\`\`\``, true)
    .addField("BACKGROND", `\`\`\`css\n${choosenBack}\n\`\`\``, true)
    .addBlankField()
    .addField("ALIGNMENT", `\`\`\`css\n${alignment}\n\`\`\``, true)
    .addField("ATTRIBUTES", `\`\`\`css
[STR] : ${base.str + racialAttributes.str} : (BASE: ${base.str}, MOD: ${mod.str}, RACE: ${racialAttributes.str})
[DEX] : ${base.dex + racialAttributes.dex} : (BASE: ${base.dex}, MOD: ${mod.dex}, RACE: ${racialAttributes.dex})
[CON] : ${base.con + racialAttributes.con} : (BASE: ${base.con}, MOD: ${mod.con}, RACE: ${racialAttributes.con})
[INT] : ${base.int + racialAttributes.int} : (BASE: ${base.int}, MOD: ${mod.int}, RACE: ${racialAttributes.int})
[WIS] : ${base.wis + racialAttributes.wis} : (BASE: ${base.wis}, MOD: ${mod.wis}, RACE: ${racialAttributes.wis})
[CHA] : ${base.cha + racialAttributes.cha} : (BASE: ${base.cha}, MOD: ${mod.cha}, RACE: ${racialAttributes.cha})\n\`\`\``, true)
    .addField("EQUIPMENT", `\`\`\`css
[Armor  ] : ${equip.armor.join(', ')}
[Gear   ] : ${equip.gear.join(', ')}
[Pack   ] : ${equip.pack.join(', ')}
[Tools  ] : ${equip.tools.join(', ')}
[Weapons] : ${equip.weapons.join(', ')}\n\`\`\``, true)
    .addField("FEATURES", `\`\`\`css\n${features.join(', ')}\n\`\`\``, true)
    .addField("HIT POINTS", `\`\`\`css\nMAX: ${hp}\n\`\`\``, true)
    .addField("LANGUAGES", `\`\`\`css\n${languages.join(', ')}\n\`\`\``, true)
    .addField("PROFICIENCY", `\`\`\`css
[Armor        ] : ${prof.armor.join(', ')}
[Saving throws] : ${prof.savthrows.join(', ')}
[Skills       ] : ${prof.skills.join(', ')}
[Tools        ] : ${prof.tools.join(', ')}
[Weapons      ] : ${prof.weapons.join(', ')}\n\`\`\``, true)
    .addField("SPEED", `\`\`\`css\nBase walking: ${speed.walking}\n\`\`\``, true)
    .setTimestamp(new Date())
    .setFooter(`© ${sender.username} Character`, sender.displayAvatarURL)
  return message.channel.send(embed)
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}