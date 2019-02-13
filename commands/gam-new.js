/* eslint-disable operator-assignment */
const Discord = require("discord.js")
const ModCharacter = require("../models/mod-character") // Require profile schema
const ModRaces = require("../models/mod-races") // Require races schema
const ModSubRaces = require("../models/mod-subraces") // Require subraces schema
const ModClass = require("../models/mod-class") // Require classes schema
const ModBack = require("../models/mod-background") // Require backgrounds schema
const tools = require("../util/functions") // Require global functions
const capitalize = require("capitalize")

// Require lowdb and then FileSync
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const arr = low(new FileSync('./jsonfiles/charcreation.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete() // Deletes the command message
  if (String(args)) return message.reply("ERRGAMCHA00 - Please don't use arguments.") // Command must be without args
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`) // Logging the request of the command
  // Local variables
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
  let asRacial = []
  let align = ''
  // Base ability score
  let basestr = await tools.rollfourdsix()
  let basedex = await tools.rollfourdsix()
  let basecon = await tools.rollfourdsix()
  let baseint = await tools.rollfourdsix()
  let basewis = await tools.rollfourdsix()
  let basecha = await tools.rollfourdsix()
  // Modifier
  let modstr = await tools.modifier(basestr)
  let moddex = await tools.modifier(basedex)
  let modcon = await tools.modifier(basecon)
  let modint = await tools.modifier(baseint)
  let modwis = await tools.modifier(basewis)
  let modcha = await tools.modifier(basecha)
  // --------------------
  // Building Rich Embeds
  // let raceEmbed = new Discord.RichEmbed() // An embed for races information
  //   .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
  //   .setTitle("1. CHARACTER's RACE")
  //   .setColor("#9665d8")
  //   .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
  //   .setDescription(`• The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.`)
  //   .addField(`↙ Choose one:`, `\`\`\`diff\n+ ${arr.get('allraces').value().join('\n+ ')}\`\`\``, true)
  //   .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired RACE.`)
  // let subRaceEmbed = new Discord.RichEmbed() // An embed for subraces information
  //   .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
  //   .setTitle("1.5. CHARACTER's SUB-RACE")
  //   .setColor("#9665d8")
  //   .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Viking-512.png")
  //   .setDescription(`• Some races have subraces. Members of a subrace have the traits of the parent race in addition to the traits specified for their subrace.`)
  //   .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired SUBRACE.`)

  let classEmbed = new Discord.RichEmbed() // An embed for class information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("2. CHARACTER's CLASS")
    .setColor("#65d8d6")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png")
    .setDescription(`• Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.`)
    .addField(`↙ Choose one`, `\`\`\`diff\n+ ${arr.get('allclasses').value().join('\n+ ')}\`\`\``, true)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired CLASS.`)
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

  // Find character from the specific user profile.
  await ModCharacter
    .findOne({
      userID: sender.id,
      serverID: server.id
    })
    .exec(async (e, result) => {
      if (e) return message.reply("ERR#GAMNEW01 - An error occurred.  Try contacting the dev.").then(console.log('[ERR01] ' + e))
      if (!result || result === null) await message.channel.send(raceEmbed) // 1 - 1. Sending RACES embed.
      else return message.channel.send(`• You already have a character. ► HIS NAME: *${result.name}*`)
    }) // ------------------------------------------------------------------
  // 1 - 2. Message await - this will wait for user to type the desire race.
  await message.channel.awaitMessages(filter, {
    max: 1,
    time: milisec,
    errors: ['time']
  }).then(async collected => {
    if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
    if (collected.first().content) choosenRace = collected.first().content.toLowerCase()
    else choosenRace = "notdefined"
    // 1 - 3. Validation of the choice - if RACE is valid the guide keep going.
    if (choosenRace === "notdefined") return message.reply("Race is not defined!")
    if (choosenRace !== "notdefined") {
      await ModRaces.findOne({
        namel: choosenRace
      }, (err, res) => {
        if (err) console.log("[ERR06] " + err)
        if (!res || res === null) {
          choosenRace = "notdefined"
          return message.channel.send(`Please, give a valid RACE! • Restart the guide typing: \`${cmd}\``)
        } else {
          asRacial = res.abilityscore
          align = capitalize.words(res.alignment)
          if (!res.subraces || res.subraces === null) choosenSubRace = "nulo"
          else { // ----------------------------------------
            choosenSubRace = "choose" // Building the array list of the SUBRACES.
            try {
              subRaceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${arr.get('subraces.' + choosenRace).value().join('\n+ ')}\`\`\``, true)
            } catch (terr) {
              return message.reply("An error occurred. Try again later.").then(console.log(terr))
            }
          }
          choosenRace = capitalize.words(choosenRace)
        }
      })
    } else return console.log("Race was not defined!")
  })
    .catch(ce => {
      choosenRace = "notdefined"
      return message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.error(ce))
    }) // -------------------------------------------------------------------
  // 1.5 - 2. Message await - this will wait for user to type the desire race.
  if (choosenSubRace === "choose") {
    await message.channel.send(subRaceEmbed)
    await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content) choosenSubRace = collected.first().content.toLowerCase()
      else choosenSubRace = "notdefined"
    })
      .catch(err => {
        choosenSubRace = "notdefined"
        return message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.log("[ERR06.1] " + err))
      })
  } else if (choosenSubRace === "notdefined") return
  // -----------------------------------------------------------------------------
  // 1.5 - 3. Validation of the choice - if SUBRACE is valid the guide keep going.
  if (choosenRace !== "notdefined" && choosenSubRace !== "notdefined") {
    try {
      await ModSubRaces.findOne({
        namel: choosenSubRace
      })
        .exec((e, result) => {
          if (e) console.log("[ERR06.2] " + e)
          if (!result || result === null || result.length === 0) {
            choosenSubRace = "notdefined"
            return message.channel.send(`Please, give a valid SUBRACE! • Restart the guide typing: \`${cmd}\`.`)
          } else {
            asRacial.str += result.abilityscore.str
            asRacial.dex += result.abilityscore.dex
            asRacial.con += result.abilityscore.con
            asRacial.int += result.abilityscore.int
            asRacial.wis += result.abilityscore.wis
            asRacial.cha += result.abilityscore.cha
            choosenSubRace = capitalize.words(choosenSubRace)
          }
        })
    } catch (err) {
      choosenSubRace = "notdefined"
      return message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.log('[ERR06.3]' + err))
    }
  } // ----------------------------------------------------------------------
  // 2 - 2. Message await - this will wait for user to type the desire class.
  if (choosenRace !== "notdefined" && choosenSubRace !== "notdefined") {
    await message.channel.send(classEmbed)
    await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content) choosenClass = collected.first().content.toLowerCase()
      else choosenClass = "notdefined"
    })
      .catch(ce => {
        choosenClass = "notdefined"
        return message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.log("[ERR10] " + ce))
      })
  } else return
  //--------------------------------------------------------------------------
  // 2 - 3. Validation of the choice - if CLASS is valid the guide keep going.
  if (choosenClass !== "notdefined") {
    await ModClass.findOne({
      namel: choosenClass
    }, (err, result) => {
      if (err) console.log("[ERR11] " + err)
      if (!result || result === null) {
        choosenClass = "notdefined"
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      } else choosenClass = capitalize.words(choosenClass)
    })
  } else return
  //--------------------------------------------------------------------------
  if (choosenClass !== "notdefined") {
    await message.channel.send(backgroundEmbed)
    // 3 - 2. Message await - this will wait for user to type the desire BACKGROUND.
    await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (!collected.first().content) choosenBack = "notdefined"
      else choosenBack = collected.first().content.toLowerCase()
    })
      .catch(ce => {
        choosenBack = "notdefined"
        return message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`).then(console.log("[ERR15] " + ce))
      })
  } else return // ----------------------------------------------------------------
  // 3 - 3. Validation of the choice - if BACKGROUND is valid the guide keep going.
  if (choosenBack !== 'notdefined') {
    await ModBack.findOne({
      namel: choosenBack
    }, (e, background) => {
      if (e) console.log("[ERR16] " + e)
      if (background === null) {
        choosenBack = "notdefined"
        return message.channel.send(`Please, give a valid BACKGROUND! • Restart the guide typing: \`${cmd}\`.`)
      }
      if (!background) return message.channel.send("Couldn't find any information.")
      else choosenBack = capitalize.words(choosenBack)
    })
  } else return
  // ----------------------------------------------------------------------------
  let qtd = 8
  if (choosenSubRace !== "notdefined") qtd = 10
  if (choosenRace !== "notdefined" && choosenClass !== "notdefined" && choosenBack !== "notdefined") {
    await message.channel.bulkDelete(qtd)
    await guideEmbed.setFooter(`Do you wish to continue?`)
      .setDescription(`An official D&D character sheet is a fine place to start until you know what information you need and how you use it during the game.`)
      .addField(`**${sender.username}**, your choices are:`, `\`\`\`diff\n+ Race       > ${choosenSubRace.toUpperCase() || choosenRace.toUpperCase()}\n+ Class      > ${choosenClass.toUpperCase()}\n+ Background > ${choosenBack.toUpperCase()}\`\`\``)
    const filterReaction = (reaction, user) => [
      '✅',
      '❎'
    ].includes(reaction.emoji.name) && user.id === message.author.id
    await message.channel.send(guideEmbed).then(async msg => {
      await msg.react('✅')
      await msg.react('❎')
      msg
        .awaitReactions(filterReaction, {
          max: 1,
          time: milisec,
          errors: ['time']
        })
        .then(async collected => {
          const reaction = collected.first()
          switch (reaction.emoji.name) {
            case '✅':
              salva = await true
              message.reply("Okay!")
              break
            case '❎':
              salva = await false
              message.reply("Come back later!")
              break
            default:
              message.reply("Come back later!")
              break
          }
          if (salva) {
            await ModCharacter.findOne({
              userID: sender.id,
              serverID: message.guild.id
            })
              .exec(async (e, result) => {
                if (e) return message.reply("[ERR#GAMNEW16] - An error occurred.  Try contacting the dev.").then(console.log('[ERR16] ' + e))
                //if (result === null) return message.reply("[ERR#GAMNEW16.5] - An error occurred on database.  Try contacting the dev.")
                if (!result) {
                  await message.channel.send(nameEmbed)
                  await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: milisec,
                    errors: ['time']
                  }).then(collected => {
                    if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
                    if (!collected.first().content) choosenName = 'notdefined'
                    else choosenName = capitalize.words(collected.first().content)
                  })
                    .catch(cce => {
                      message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`)
                      return console.log("[ERRO17] " + cce)
                    })
                  // Create a new character profile with the choices made and the informations collected from it
                  const newProfile = new ModCharacter({
                    userID: sender.id,
                    serverID: server.id,
                    characters: {
                      id: 0,
                      valid: 1,
                      name: choosenName,
                      race: choosenSubRace || choosenRace,
                      class: choosenClass,
                      background: choosenBack,
                      level: 1,
                      attributes: {
                        str: {
                          base: basestr,
                          racial: asRacial.str,
                          improve: 0,
                          mod: modstr,
                          total: basestr + asRacial.str
                        },
                        dex: {
                          base: basedex,
                          racial: asRacial.dex,
                          improve: 0,
                          mod: moddex,
                          total: basedex + asRacial.dex
                        },
                        con: {
                          base: basecon,
                          racial: asRacial.con,
                          improve: 0,
                          mod: modcon,
                          total: basecon + asRacial.con
                        },
                        int: {
                          base: baseint,
                          racial: asRacial.int,
                          improve: 0,
                          mod: modint,
                          total: baseint + asRacial.int
                        },
                        wis: {
                          base: basewis,
                          racial: asRacial.wis,
                          improve: 0,
                          mod: modwis,
                          total: basewis + asRacial.wis
                        },
                        cha: {
                          base: basecha,
                          racial: asRacial.cha,
                          improve: 0,
                          mod: modcha,
                          total: basecha + asRacial.cha
                        }
                      },
                      hp: {
                        hpoints: 0
                      },
                      alignment: align,
                      sex: 'u',
                      thumb: "https://cdn4.iconfinder.com/data/icons/famous-character-vol-2-flat/48/Avatar_Famous_Characters-07-512.png"
                    }
                  })
                  newProfile
                    .save()
                    .then(msg => {
                      console.log("[ID: %s]", msg.characters.id)
                      message.reply("▲ A new PROFILE was created for you. Type command \`profile\` to see.")
                    })
                    .catch(ce => {
                      message.reply("GAMCHA02 - Couldn't save your new profile")
                      return console.log('[ERR16] ' + ce)
                    })
                } else return message.channel.send(`► You already have a character.\nHIS NAME: *${result.name}*`)
              })
          } else console.log('SAVE: ' + salva)
        })
        .catch(ce => {
          console.log(ce)
          return message.reply("I couldn't do any!")
        })
    })
      .catch(ce1 => {
        console.log(ce1)
        return message.reply("I couldn't do any!")
      })
  } else return console.log("Exiting!")
  //console.log('Start sleeping') await new Promise(resolve => setTimeout(resolve, 5000)) console.log('Five seconds later')
}
module.exports.config = {
  name: "new",
  aliases: ["create"]
}