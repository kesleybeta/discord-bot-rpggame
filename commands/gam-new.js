const Discord = require("discord.js")
const ModProfile = require("../models/mod-character") // Require profile schema
//const ModCharacter = require("../models/mod-character") // Require character profile schema
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
  let stembed = new Discord.RichEmbed()
    .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
    .setColor("#808080")
    .setDescription(`— To start your new adventure I'll need your card number... *ha.. haha.. just kidding, this doesn't exist here.. ~yet~?*\n— Let's create your new **CHARACTER** ?? ▼`)
  let rEmbed = new Discord.RichEmbed() // An embed for races information
    .setTitle("1. Choose your character's RACE")
    .setColor("#9665d8")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`• The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired RACE.`)
  let sRembed = new Discord.RichEmbed()
    .setTitle("1.5. CHOOSE YOUR CHARACTER'S SUB-RACE")
    .setColor("#9665d8")
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired SUBRACE.`)
  let cEmbed = new Discord.RichEmbed() // An embed for class information
    .setTitle("2. CHOOSE YOUR CHARACTER'S CLASS")
    .setColor("#65d8d6")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png")
    .setDescription(`• Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired CLASS.`)
  let bEmbed = new Discord.RichEmbed() // An embed for class information
    .setTitle("3. CHOOSE YOUR CHARACTER'S **BACKGROUND**")
    .setColor("#69db83")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Grim_Reaper-512.png")
    .setDescription(`• Your character’s background reveals where you came from, how you became an adventurer, and your place in the world.`)
    .setFooter(`⏰ You'll have ${milisec / 1000} seconds to type your desired BACKGROUND.`)

  await ModProfile // Find Profile
    .findOne({
      userID: sender.id,
      serverID: sender.id
    })
    .exec((e, result) => {
      if (e) return message.reply("[GAMNEW01] - An error occurred.  Try contacting the dev.").then(console.log('[ERR01] ' + e)) // ERROR handling
      if (!result) return message.channel.send(stembed) // RESULT handling
      else return message.channel.send(`► You already have a character.\nHIS NAME: *${result.name}*`)
    }) //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let raceArray = [] // 1. Listing RACES for choose
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
    .exec((err2, res) => {
      if (err2) return message.reply("[GAMNEW02] - Try again later or contact the dev.").then(console.log('[ERR02] ' + err2)) // ERROR handling
      if (!res) return message.reply("[GAMNEW03] - Try again later.") // RESULT handling
      else {
        try {
          raceArray.push(res[0].name)
        } catch (err4) {
          return message.reply("[GAMNEW04] - Try again later or contact the dev.").then(console.log('[ERR04] ' + err4))
        }
        for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)
        rEmbed.addField(`↙ Choose one:`, `\`\`\`diff\n+ ${raceArray.join('\n+ ')}\`\`\``, true) // Building the array list of the RACES
        return message.channel.send(rEmbed).then(console.log('[1][1]: Building race embed..')) //.then(msg => msg.delete(milisec - 1))
      }
    })
  await message.channel.awaitMessages(filter, { // 2. Message await - this will wait for user to type the desire race
      max: 1,
      time: milisec,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
      if (collected.first().content.toLowerCase() !== '') choosenRace = collected.first().content.toLowerCase()
      return console.log('[1][2]')
    })
    .catch(err => {
      console.log("[ERR05] " + err)
      return message.channel.send(`Please, give a valid RACE! • Restart the guide typing: \`${cmd}\`.`)
    })
  if (choosenRace !== 'nd') { // 3. Validation of the choice - if RACE is valid the guide keep going.
    await ModRaces.findOne({
      namel: choosenRace
    }, (err, result) => {
      if (err) console.log("[ERR06] " + err)
      if (result === null) {
        choosenRace = 'nd'
        return message.channel.send(`Please, give a valid RACE! • Restart the guide typing: \`${cmd}\``)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      else if (result.subraces) {
        //teste        //choosenSubRace = 'ndy'
        sRembed.addField('↙ Choose one:', `\`\`\`diff\n+ ${result.subraces.join('\n+ ')}\`\`\``, true) // Building the array list of the SUBRACES
        //teste        //return message.channel.send(sRembed).then(console.log('[1][3]: ' + result.name)) //.then(msg => msg.delete(milisec - 1))
      }
      return console.log('[1][3]: Valid.')
    }) //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  }
  if (choosenSubRace === 'ndy') {
    await message.channel.awaitMessages(filter, { // 2.5. Message await - this will wait for user to type the desire race
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (collected.first().content.toLowerCase()) choosenSubRace = collected.first().content.toLowerCase()
        return console.log('[1.5][2.5]')
      })
      .catch(err => {
        console.log("[ERR05.5] " + err)
        return message.channel.send(`Please, give a valid SUBRACE! • Restart the guide typing: \`${cmd}\`.`)
      })
  } //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let classArray = [] // 1. Listing CLASSES for choose
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
        cEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${classArray.join('\n+ ')}\`\`\``, true)
        if (choosenRace !== 'nd') return message.channel.send(cEmbed).then(console.log('[1][1]: Building race embed..')) //.then(msg => msg.delete(milisec - 1))
        else return message.channel.send("Try again later.")
      }
    })
  if (choosenRace !== 'nd') { // 2. Message await - this will wait for user to type the desire class
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (collected.first().content.toLowerCase()) choosenClass = collected.first().content.toLowerCase()
        return console.log('[2][2]')
      })
      .catch(err => {
        console.log("[ERR10] " + err)
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      })
  }
  if (choosenClass !== 'nd') { // 3. Validation of the choice - if CLASS is valid the guide keep going.
    await ModClass.findOne({
      namel: choosenClass
    }, (err, result) => {
      if (err) console.log("[ERR11] " + err)
      if (result === null) {
        choosenClass = 'nd'
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      else return console.log('[2][3]: ' + result.name)
    })
  } //  ---------------------------------------------------------------------- ----------------------------------------------------------------------
  let backArray = [] // 1. Listing BACKGROUND for choose
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
      .exec((eR, res) => {
        if (eR) return message.reply("GAMCHA12 - Try again later or contact the dev.").then(console.log('[ERR12] ' + eR))
        if (!res) return message.reply("GAMCHA13 - Try again later.").then(console.log("[ERR13] Couldn't find result"))
        else {
          try {
            backArray.push(res[0].name)
          } catch (err) {
            return message.reply("GAMCHA14 - Try again later or contact the dev.").then(console.log('[ERR14] ' + err))
          }
          for (let i = 1; i < res.length; i++) backArray.unshift(res[i].name)
          bEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${backArray.join('\n+ ')}\`\`\``, true)
          if (choosenClass !== 'nd') return message.channel.send(bEmbed) //.then(msg => msg.delete(milisec - 1))
        }
      })
    return console.log('[3][1]: ')
  }
  // 2. Message await - this will wait for user to type the desire class
  if (choosenClass !== 'nd' && choosenRace !== 'nd') {
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: milisec,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() === "cancel") return message.reply("Cancelled!")
        if (!collected.first().content) choosenBack = 'nd'
        else {
          //message.delete()
          choosenBack = collected.first().content.toLowerCase()
        }
        return console.log('[3][2]')
      })
      .catch(err => {
        console.log("[ERR15] " + err)
        return message.channel.send(`Please, give a valid CLASS! • Restart the guide typing: \`${cmd}\`.`)
      })
    return console.log('[3][2]: Concluded.')
  }
  // 3. Validation of the choice - if BACKGROUND is valid the guide keep going.
  if (choosenBack !== 'nd') {
    await ModBack.findOne({
      namel: choosenBack
    }, (err, result) => {
      if (err) console.log("[ERR16] " + err)
      if (result === null) {
        choosenBack = 'nd'
        return message.channel.send(`Please, give a valid BACKGROUND! • Restart the guide typing: \`${cmd}\`.`)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      else return console.log('[3][3]: ' + result.name)
    })
  } //  ---------------------------------------------------------------------- ----------------------------------------------------------------------

  //message.reply("You choose: *" + choosenRace + "* ?")
  // const newProfile = new ModProfile({
  //     userID: sender.id,
  //     serverID: message.guild.id,
  //     characters: { // --------------------THIS IS JUST THE END DUMB
  //         id: 0,
  //         valid: 0
  //     }
  // })
  // newProfile
  //     .save()
  //     .then(msg => {
  //         console.log("id" + msg.characters.id)
  //         message.reply("▲ A new PROFILE was created for you.")

  //     })
  //     .catch(err2 => {
  //         console.log('[ERR02] ' + err2)
  //         return message.reply("GAMCHA02 - Couldn't save your new profile")
  //     })

  // console.log('Start sleeping')
  // await new Promise(resolve => setTimeout(resolve, 5000))
  // console.log('Five seconds later')

  if (choosenRace !== 'nd' && choosenSubRace !== 'nd' && choosenClass !== 'nd' && choosenBack !== 'nd') return message.channel.send(`\`\`\`diff\n- User       > ${sender.username}\n+ Race       > ${choosenRace.toUpperCase()}\n+ Subrace    > ${choosenSubRace.toUpperCase()}\n+ Class      > ${choosenClass.toUpperCase()}\n+ Background > ${choosenBack.toUpperCase()}\`\`\``)
  return console.log('[END]')
}

module.exports.config = {
  name: "new",
  aliases: ["create"]
}