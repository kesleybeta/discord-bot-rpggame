/* eslint-disable operator-assignment */
const Discord = require("discord.js")
const ModCharacter = require("../models/mod-character") // Require profile schema
const ModRaces = require("../models/mod-races") // Require races schema
const ModSubRaces = require("../models/mod-subraces") // Require subraces schema
const ModClass = require("../models/mod-class") // Require classes schema
const ModBack = require("../models/mod-background") // Require backgrounds schema
const tools = require("../util/functions") // Require global functions
// Require lowdb and then FileSync
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const arr = low(new FileSync('./jsonfiles/charcreation.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete() // Deletes the command message
  if (String(args)) return message.reply("ERRGAMCHA00 - Please don't use arguments.") // Command must be without args
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`) // Logging the request of the command
  // Variables
  let sender = message.author // For better code-read purposes
  const filter = msg => msg.author.id === sender.id
  let choosenRace = 'nd'
  let choosenSubRace = ''
  let asRacial = []
  let choosenClass = 'nd'
  let choosenBack = 'nd'
  let choosenName = 'nd'
  let milisec = 30000 // Global time of wait
  let salva = false

  let min = Math.ceil(8)
  let max = Math.floor(15)

  let basestr = await Math.floor(Math.random() * (max - min + 1)) + min
  let basedex = await Math.floor(Math.random() * (max - min + 1)) + min
  let basecon = await Math.floor(Math.random() * (max - min + 1)) + min
  let baseint = await Math.floor(Math.random() * (max - min + 1)) + min
  let basewis = await Math.floor(Math.random() * (max - min + 1)) + min
  let basecha = await Math.floor(Math.random() * (max - min + 1)) + min

  let modstr = await tools.modifier(basestr)
  let moddex = await tools.modifier(basedex)
  let modcon = await tools.modifier(basecon)
  let modint = await tools.modifier(baseint)
  let modwis = await tools.modifier(basewis)
  let modcha = await tools.modifier(basecha)
  // --------------------
  // Building Rich Embeds
  let guideEmbed = new Discord.RichEmbed()
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Spell_Scroll-512.png")
    .setColor("#808080")
    .setDescription(`Your first step in playing an adventurer in the Dungeons & Dragons game is to imagine and create a character of your own. Your character is a combination of game statistics, roleplaying hooks, and your imagination.\n— Let's create your new **CHARACTER** ?? ▼`)
  let raceEmbed = new Discord.RichEmbed() // An embed for races information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("1. CHARACTER's RACE")
    .setColor("#9665d8")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`• The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired RACE.`)
  let subRaceEmbed = new Discord.RichEmbed() // An embed for subraces information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("1.5. CHARACTER's SUB-RACE")
    .setColor("#9665d8")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Viking-512.png")
    .setDescription(`• Some races have subraces. Members of a subrace have the traits of the parent race in addition to the traits specified for their subrace.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired SUBRACE.`)
  let classEmbed = new Discord.RichEmbed() // An embed for class information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("2. CHARACTER's CLASS")
    .setColor("#65d8d6")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png")
    .setDescription(`• Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired CLASS.`)
  let backgroundEmbed = new Discord.RichEmbed() // An embed for background information
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("3. CHARACTER'S BACKGROUND")
    .setColor("#69db83")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Grim_Reaper-512.png")
    .setDescription(`• Your character’s background reveals where you came from, how you became an adventurer, and your place in the world.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired BACKGROUND.`)
  let nameEmbed = new Discord.RichEmbed()
    .setColor(3447003)
    .setAuthor("Character Creation", "https://cdn4.iconfinder.com/data/icons/game-rounded-2-set/512/scroll-512.png")
    .setTitle("4. CHARACTER's NAME")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`• Choose a ***name*** for your character.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type.`)
  // ------------------------------------
  // Find from the specific user profile.
  await ModCharacter
    .findOne({
      userID: sender.id,
      serverID: sender.id
    })
    .exec((e, result) => {
      if (e) return message.reply("ERR#GAMNEW01 - An error occurred.  Try contacting the dev.").then(console.log('[ERR01] ' + e))
      if (!result || result === null) {
        message.channel.send(guideEmbed)
        // --------------------------------------------
        // 1 - 1. Building the array list of the RACES.
        raceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${arr.get('allraces').value()
        .join('\n+ ')}\`\`\``, true)
        message.channel.send(raceEmbed)
      } else return message.channel.send(`• You already have a character. ► HIS NAME: *${result.name}*`)
    }) // ------------------------------------------------------------------
  // 1 - 2. Message await - this will wait for user to type the desire race.
  await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content.toLowerCase()) choosenRace = collected.first().content.toLowerCase()
    })
    .catch(ce => {
      message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`)
      return console.error(ce)
    }) // -------------------------------------------------------------------
  // 1 - 3. Validation of the choice - if RACE is valid the guide keep going.
  if (choosenRace !== 'nd') {
    await ModRaces.findOne({
      namel: choosenRace
    }, (e, result) => {
      if (e) console.log("[ERR06] " + e)
      if (!result || result === null) {
        choosenRace = 'nd'
        return message.channel.send(`Please, give a valid RACE! • Restart the guide typing: \`${cmd}\``)
      } else {
        asRacial = result.abilityscore
        // If choosen RACE have a subrace build an embed with a subrace's list
        if (!result.subraces || result.subraces === null) choosenSubRace = ''
        else {
          choosenSubRace = 'ndy'
          // ----------------------------------------
          // Building the array list of the SUBRACES.
          subRaceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${arr.get('subraces.' + choosenRace).value()
          .join('\n+ ')}\`\`\``, true)
        }
      }
    })
  } // -----------------------------------------------------------------------
  // 1.5 - 2. Message await - this will wait for user to type the desire race.
  if (choosenSubRace === 'ndy') {
    await message.channel.send(subRaceEmbed)
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (collected.first().content.toLowerCase()) choosenSubRace = collected.first().content.toLowerCase()
      })
      .catch(err => {
        message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`)
        return console.log("[ERR06.1] " + err)
      })
  } // ---------------------------------------------------------------------------
  // 1.5 - 3. Validation of the choice - if SUBRACE is valid the guide keep going.
  if (choosenSubRace !== '' && choosenSubRace !== 'ndy') {
    try {
      await ModSubRaces.findOne({
          namel: choosenSubRace
        })
        .exec((e, result) => {
          if (e) console.log("[ERR06.2] " + e)
          if (!result || result === null || result.length === 0) {
            choosenSubRace = 'nd'
            return message.channel.send(`Please, give a valid SUBRACE! • Restart the guide typing: \`${cmd}\`.`)
          } else {
            asRacial.str += result.abilityscore.str
            asRacial.dex += result.abilityscore.dex
            asRacial.con += result.abilityscore.con
            asRacial.int += result.abilityscore.int
            asRacial.wis += result.abilityscore.wis
            asRacial.cha += result.abilityscore.cha
          }
        })
    } catch (err) {
      console.log('[ERR06.3]' + err)
    }
  } // --------------------------------------------
  // 2 - 1. Building the array list of the CLASSES.
  await classEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${arr.get('allclasses').value()
  .join('\n+ ')}\`\`\``, true)
  // ------------------------------------------------------------------------
  // 2 - 2. Message await - this will wait for user to type the desire class.
  if (choosenRace !== 'nd' && choosenSubRace !== 'ndy') await message.channel.send(classEmbed)
  await message.channel.awaitMessages(filter, {
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content.toLowerCase()) choosenClass = collected.first().content.toLowerCase()
    })
    .catch(ce => {
      message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`)
      return console.log("[ERR10] " + ce)
    })
  //--------------------------------------------------------------------------
  // 2 - 3. Validation of the choice - if CLASS is valid the guide keep going.
  if (choosenClass !== 'nd') {
    await ModClass.findOne({
      namel: choosenClass
    }, (err, result) => {
      if (err) console.log("[ERR11] " + err)
      if (!result || result === null) {
        choosenClass = 'nd'
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      }
    })
  } // ------------------------------------------------
  // 3 - 1. Building the array list of the BACKGROUNDS.
  if (choosenClass !== 'nd') {
    backgroundEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${arr.get('allbacks').value()
    .join('\n+ ')}\`\`\``, true)
    if (choosenClass !== 'nd') message.channel.send(backgroundEmbed)
  } // ----------------------------------------------------------------------
  // 3 - 2. Message await - this will wait for user to type the desire class.
  if (choosenClass !== 'nd' && choosenRace !== 'nd' && choosenSubRace !== 'ndy') {
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (!collected.first().content) choosenBack = 'nd'
        else choosenBack = collected.first().content.toLowerCase()
      })
      .catch(ce => {
        message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`)
        return console.log("[ERR15] " + ce)
      })
  } // ----------------------------------------------------------------------------
  // 3 - 3. Validation of the choice - if BACKGROUND is valid the guide keep going.
  if (choosenBack !== 'nd') {
    await ModBack.findOne({
      namel: choosenBack
    }, (e, background) => {
      if (e) console.log("[ERR16] " + e)
      if (background === null) {
        choosenBack = 'nd'
        return message.channel.send(`Please, give a valid BACKGROUND! • Restart the guide typing: \`${cmd}\`.`)
      }
      if (!background) return message.channel.send("Couldn't find any information.")
    })
  } // ----------------------------------------------------------------------------
  let qtd = 8
  if (choosenSubRace.toUpperCase() !== '') qtd = 10
  if (choosenRace !== 'nd' && choosenClass !== 'nd' && choosenBack !== 'nd') {
    await message.channel.bulkDelete(qtd)
    await guideEmbed.setFooter(`Do you wish to continue?`)
      .setDescription(`An official D&D character sheet is a fine place to start until you know what information you need and how you use it during the game.`)
      .addField(`Your choices, **${sender.username}**:`, `\`\`\`diff\n+ Race       > ${choosenSubRace.toUpperCase() || choosenRace.toUpperCase()}\n+ Class      > ${choosenClass.toUpperCase()}\n+ Background > ${choosenBack.toUpperCase()}\`\`\``)
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
                  if (!result || result === null) {
                    await message.channel.send(nameEmbed)
                    await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: milisec,
                        errors: ['time']
                      }).then(collected => {
                        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
                        if (!collected.first().content) choosenName = 'nd'
                        else choosenName = collected.first().content.toUpperCase()
                      })
                      .catch(cce => {
                        message.channel.send(`Time's up! • Restart the guide typing: \`${cmd}\`.`)
                        return console.log("[ERRO17] " + cce)
                      })
                    const newProfile = new ModCharacter({
                      userID: sender.id,
                      serverID: message.guild.id,
                      characters: {
                        id: 0,
                        valid: 1,
                        name: choosenName,
                        race: choosenRace || choosenSubRace,
                        class: choosenClass,
                        background: choosenBack,
                        attributes: {
                          str: {
                            base: basestr,
                            racial: asRacial.str,
                            mod: modstr,
                            total: basestr + asRacial.str
                          },
                          dex: {
                            base: basedex,
                            racial: asRacial.dex,
                            mod: moddex,
                            total: basedex + asRacial.dex
                          },
                          con: {
                            base: basecon,
                            racial: asRacial.con,
                            mod: modcon,
                            total: basecon + asRacial.con
                          },
                          int: {
                            base: baseint,
                            racial: asRacial.int,
                            mod: modint,
                            total: baseint + asRacial.int
                          },
                          wis: {
                            base: basewis,
                            racial: asRacial.wis,
                            mod: modwis,
                            total: basewis + asRacial.wis
                          },
                          cha: {
                            base: basecha,
                            racial: asRacial.cha,
                            mod: modcha,
                            total: basecha + asRacial.cha
                          }
                        },
                        hp: {
                          hpoints: 0
                        },
                        alignment: 'u',
                        sex: 'u',
                        thumb: "https://cdn4.iconfinder.com/data/icons/famous-character-vol-2-flat/48/Avatar_Famous_Characters-07-512.png"
                      }
                    })
                    newProfile
                      .save()
                      .then(msg => {
                        console.log("[ID: %s]", msg.characters.id)
                        message.reply("▲ A new PROFILE was created for you.")

                      })
                      .catch(ce => {
                        message.reply("GAMCHA02 - Couldn't save your new profile")
                        return console.log('[ERR16] ' + ce)
                      })
                  } else return message.channel.send(`► You already have a character.\nHIS NAME: *${result.name}*`)
                })
            } else message.reply('qq coteceu?')
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
  }
  //console.log('Start sleeping') await new Promise(resolve => setTimeout(resolve, 5000)) console.log('Five seconds later')
}
module.exports.config = {
  name: "new",
  aliases: ["create"]
}