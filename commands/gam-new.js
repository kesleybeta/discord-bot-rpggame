const Discord = require("discord.js")
const ModCharacter = require("../models/mod-character") // Require profile schema
const ModRaces = require("../models/mod-races") // Require races schema
const ModClass = require("../models/mod-class") // Require classes schema
const ModBack = require("../models/mod-background") // Require backgrounds schema

module.exports.run = async (message, cmd, args) => {
  await message.delete() // Deletes the command message
  if (String(args)) return message.reply("ERRGAMCHA00 - Please don't use arguments.") // Command must be without args
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`) // Logging the request of the command
  //Util variables
  let sender = message.author // For better code-read purposes
  const filter = msg => msg.author.id === sender.id
  let choosenRace = 'nd'
  let choosenSubRace = ''
  let choosenClass = 'nd'
  let choosenBack = 'nd'
  let milisec = 30000
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
  let subRaceEmbed = new Discord.RichEmbed()
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
  await ModCharacter // Find from the specific user profile ------------------------------------------------------------------------------------------------------
    .findOne({
      userID: sender.id,
      serverID: sender.id
    })
    .exec((e, result) => {
      if (e) return message.reply("[GAMNEW01] - An error occurred.  Try contacting the dev.").then(console.log('[ERR01] ' + e))
      if (!result) return message.channel.send(guideEmbed)
      else return message.channel.send(`• You already have a character. ► HIS NAME: *${result.name}*`)
    }) //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let raceArray = [] // 1 - 1. Listing RACES for choose
  await ModRaces // Building the RACE embed.
    .find({
      source: "handbook"
    })
    .sort([
      [
        'name',
        'descending'
      ]
    ])
    .exec((e, res) => {
      if (e) return message.reply("[GAMNEW02] - Try again later or contact the dev.").then(console.log('[ERR02] ' + e)) // ERROR handling
      if (!res) return message.reply("[GAMNEW03] - Try again later.") // RESULT handling
      else {
        try {
          raceArray.push(res[0].name)
        } catch (ce) {
          return message.reply("[GAMNEW04] - Try again later or contact the dev.").then(console.log('[ERR04] ' + ce))
        }
        for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)
        raceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${raceArray.join('\n+ ')}\`\`\``, true) // Building the array list of the RACES
        return message.channel.send(raceEmbed)
      }
    })
  await message.channel.awaitMessages(filter, { // 1 - 2. Message await - this will wait for user to type the desire race
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content.toLowerCase()) choosenRace = collected.first().content.toLowerCase()
    })
    .catch(ce => {
      console.log("[ERR05] " + ce)
      return message.channel.send(`Please, give a valid RACE! • Restart the guide typing: \`${cmd}\`.`)
    })
  if (choosenRace !== 'nd') { // 1 - 3. Validation of the choice - if RACE is valid the guide keep going.
    await ModRaces.findOne({
      namel: choosenRace
    }, (e, result) => {
      if (e) console.log("[ERR06] " + e)
      if (result === null) {
        choosenRace = 'nd'
        return message.channel.send(`Please, give a valid RACE! • Restart the guide typing: \`${cmd}\``)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      if (!result.subraces.toString()) choosenSubRace = ''
      else {
        let subraceArray = []
        choosenSubRace = 'ndy'
        try {
          subraceArray.push(result.subraces[0].name)
        } catch (ce) {
          return message.reply("[GAMNEW04] - Try again later or contact the dev.").then(console.log('[ERR04] ' + ce))
        }
        for (let i = 1; i < result.subraces.length; i++) subraceArray.unshift(result.subraces[i].name)
        subRaceEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${subraceArray.join('\n+ ')}\`\`\``, true) // Building the array list of the RACES
      }
    }) //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  }
  if (choosenSubRace === 'ndy') {
    await message.channel.send(subRaceEmbed)
    await message.channel.awaitMessages(filter, { //1.5 - 2. Message await - this will wait for user to type the desire race
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (collected.first().content.toLowerCase()) choosenSubRace = collected.first().content.toLowerCase()
      })
      .catch(err => {
        console.log("[ERR06.1] " + err)
        return message.channel.send(`Please, give a valid SUBRACE! • Restart the guide typing: \`${cmd}\`.`)
      })
  }
  if (choosenSubRace !== '' && choosenSubRace !== 'ndy') {
    await ModRaces.findOne({
      'subraces.namel': choosenSubRace
    }, (err, result) => {
      if (err) console.log("[ERR6.2] " + err)
      if (result === null) {
        choosenSubRace = 'nd'
        return message.channel.send(`Please, give a valid SUBRACE! • Restart the guide typing: \`${cmd}\`.`)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
    })
  }
  //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let classArray = [] // 2 - 1. Listing CLASSES for choose
  await ModClass // Building the CLASS embed.
    .find({
      source: "official"
    })
    .sort([
      [
        'name',
        'descending'
      ]
    ])
    .exec((e, res) => {
      if (e) return message.reply("GAMCHA07 - Try again later or contact the dev.").then(console.log('[ERR07] ' + e))
      if (!res) return message.reply("GAMCHA08 - Try again later.").then(console.log("[ERR08] Couldn't find result"))
      else {
        try {
          classArray.push(res[0].name)
        } catch (err) {
          console.log('[ERR09] ' + err)
          return message.reply("GAMCHA09 - Try again later or contact the dev.")
        }
        for (let i = 1; i < res.length; i++) classArray.unshift(res[i].name)
        classEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${classArray.join('\n+ ')}\`\`\``, true)
        if (choosenRace !== 'nd' && choosenSubRace !== 'ndy') return message.channel.send(classEmbed) //Class embed builded sended
        ///else return
      }
    })
  if (choosenRace !== 'nd' && choosenSubRace !== 'ndy') { // 2 - 2. Message await - this will wait for user to type the desire class
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (collected.first().content.toLowerCase()) choosenClass = collected.first().content.toLowerCase()
      })
      .catch(err => {
        console.log("[ERR10] " + err)
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      })
  }
  if (choosenClass !== 'nd') { // 2 - 3. Validation of the choice - if CLASS is valid the guide keep going.
    await ModClass.findOne({
      namel: choosenClass
    }, (err, result) => {
      if (err) console.log("[ERR11] " + err)
      if (result === null) {
        choosenClass = 'nd'
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
    })
  } //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let backArray = [] // 3 - 1. Listing BACKGROUND for choose
  if (choosenClass !== 'nd') {
    await ModBack // Building the BACKGROUND embed.
      .find({
        source: "basicrules"
      })
      .sort([
        [
          'name',
          'descending'
        ]
      ])
      .exec((e, res) => {
        if (e) return message.reply("GAMCHA12 - Try again later or contact the dev.").then(console.log('[ERR12] ' + e))
        if (!res) return message.reply("GAMCHA13 - Try again later.").then(console.log("[ERR13] Couldn't find result"))
        else {
          try {
            backArray.push(res[0].name)
          } catch (ce) {
            return message.reply("GAMCHA14 - Try again later or contact the dev.").then(console.log('[ERR14] ' + ce))
          }
          for (let i = 1; i < res.length; i++) backArray.unshift(res[i].name)
          backgroundEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${backArray.join('\n+ ')}\`\`\``, true)
          if (choosenClass !== 'nd') message.channel.send(backgroundEmbed)
        }
      })
  }
  if (choosenClass !== 'nd' && choosenRace !== 'nd' && choosenSubRace !== 'ndy') { // 3 - 2. Message await - this will wait for user to type the desire class
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
        message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
        return console.log("[ERR15] " + ce)
      })
  }
  if (choosenBack !== 'nd') { // 3 - 3. Validation of the choice - if BACKGROUND is valid the guide keep going.
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
  } //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let qtd = 8
  if (choosenSubRace.toUpperCase() !== '') qtd = 10
  if (choosenRace !== 'nd' && choosenClass !== 'nd' && choosenBack !== 'nd') {
    message.channel.bulkDelete(qtd)
    guideEmbed.setFooter(`Do you wish to continue?`)
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
        .then(collected => {
          const reaction = collected.first()
          switch (reaction.emoji.name) {
            case '❎':
              //message.channel.bulkDelete(1).catch(e => { message.reply("[ERR17] - Try again later or contact the dev.").then(console.log(e))})
              return message.reply("Come back later!")
            case '✅':
              //message.channel.bulkDelete(1).catch(e => { message.reply("[ERR18] - Try again later or contact the dev.").then(console.log(e)) })

              return message.reply("I'm saving youuu....")
            default:
              return message.channel.send("¯\\_(ツ)_/¯")
          }
        })
        .catch(ce => {
          console.log(ce)
          return message.reply("I couldn't do any!")
        })
    })
  }
  // ModCharacter.findOne({
  //     userID: sender.id,
  //     serverID: message.guild.id
  //   })
  //   .exec((e, result) => {
  //     if (e) return message.reply("[GAMNEW01] - An error occurred.  Try contacting the dev.").then(console.log('[ERR01] ' + e))
  //     if (!result) {
  //       const newProfile = new ModCharacter({
  //         userID: sender.id,
  //         serverID: message.guild.id,
  //         characters: {
  //           id: 0,
  //           valid: 0
  //         }
  //       })
  //       newProfile
  //         .save()
  //         .then(msg => {
  //           console.log("id" + msg.characters.id)
  //           message.reply("▲ A new PROFILE was created for you.")

  //         })
  //         .catch(err2 => {
  //           console.log('[ERR02] ' + err2)
  //           return message.reply("GAMCHA02 - Couldn't save your new profile")
  //         })
  //     } else return message.channel.send(`► You already have a character.\nHIS NAME: *${result.name}*`)
  //   })
  //   .catch(ce => {
  //     console.log("[ERR3515]: " + ce)
  //   })

  // console.log('Start sleeping')
  // await new Promise(resolve => setTimeout(resolve, 5000))
  // console.log('Five seconds later')
}

module.exports.config = {
  name: "new",
  aliases: ["create"]
}