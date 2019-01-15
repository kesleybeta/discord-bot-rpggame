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
  let choosenClass = 'nd'
  let choosenBack = 'nd'
  let embed = new Discord.RichEmbed() // An embed for character information
  embed
    .setAuthor(sender.tag, sender.avatarURL)
  let rEmbed = new Discord.RichEmbed() // An embed for races information
    .setTitle("1. CHOOSE YOUR CHARACTER'S RACE")
    .setColor("#00D0FF")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`• Every character belongs to a race.\n• The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.`)
    .setFooter("⏰ You'll have `15 seconds` to type your desired RACE.")
  let cEmbed = new Discord.RichEmbed() // An embed for class information
    .setTitle("2. CHOOSE YOUR CHARACTER'S CLASS")
    .setColor("#11E200")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Knight-512.png")
    .setDescription(`• Class is the primary definition of what your character can do.\n• It’s more than a profession; it’s your character’s calling.  Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.`)
    .setFooter("⏰ You'll have `15 seconds` to type your desired CLASS.")

  let bEmbed = new Discord.RichEmbed() // An embed for class information
    .setTitle("3. CHOOSE YOUR CHARACTER'S **BACKGROUND**")
    .setColor("#22F311")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Grim_Reaper-512.png")
    .setDescription(`• Every story has a beginning.\n• Your character’s background reveals where you came from, how you became an adventurer, and your place in the world.`)
    .setFooter("⏰ You'll have `15 seconds` to type your desired BACKGROUND.")

  // Find Profile
  ModProfile
    .findOne({
      userID: sender.id,
      serverID: sender.id
    })
    .exec((e, result) => {
      // ERROR handling
      if (e) {
        console.log('[ERR01] ' + e)
        return message.reply("GAMCHA01 - An error occurred.  Try contacting the dev.")
      }
      // RESULT handling
      if (!result) message.reply(`▼ A new one will be created. Follow the guide:`)
      else return message.channel.send(`► You already have a character.\nHIS NAME: *${result.name}*`)
    })

  // 1. Listing RACES for choose ----------------------------------------------------------
  let raceArray = []
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
      console.log(res.length)
      if (e) {
        console.log('[ERR02] ' + e)
        return message.reply("GAMCHA02 - Try again later or contact the dev.")
      }
      if (!res) {
        console.log("[ERR03] Couldn't find result")
        return message.reply("GAMCHA03 - Try again later.")
      } else {
        try {
          raceArray.push(res[0].name)
        } catch (err) {
          console.log('[ERR04] ' + err)
          return message.reply("GAMCHA05 - Try again later or contact the dev.")
        }
        for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)
        rEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${raceArray.join('\n+ ')}\`\`\``, true)
        return message.channel.send(rEmbed).then(msg => msg.delete(15001))
      }
    })
  // 2. Message await - this will wait for user to type the desire race
  await message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time']
    }).then(collected => {
      if (collected.first().content.toLowerCase() !== '') choosenRace = collected.first().content.toLowerCase()
    })
    .catch(err => {
      console.log("[ERR05] " + err)
      return message.channel.send(`Please, give a valid RACE!\nRestart the guide typing: \`${cmd}\`.`)
    })
  // 3. Validation of the choice - if RACE is valid the guide keep going.
  if (choosenRace !== 'nd') {
    await ModRaces.findOne({
      namel: choosenRace
    }, (err, result) => {
      if (err) console.log("[ERR06] " + err)
      if (result === null) {
        choosenRace = 'nd'
        return message.channel.send(`Please, give a valid RACE! - Restart the guide typing: \`${cmd}\``)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      else {
        console.log(result.name)
        //if (result.subraces) message.reply("Opcao de escolha de subraça aqui.")
      }
    })
  }

  // 1. Listing CLASSES for choose ----------------------------------------------------------
  let classArray = []
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
      console.log(res.length)
      if (e) {
        console.log('[ERR07] ' + e)
        return message.reply("GAMCHA07 - Try again later or contact the dev.")
      }
      if (!res) {
        console.log("[ERR08] Couldn't find result")
        return message.reply("GAMCHA08 - Try again later.")
      } else {
        try {
          classArray.push(res[0].name)
        } catch (err) {
          console.log('[ERR09] ' + err)
          return message.reply("GAMCHA09 - Try again later or contact the dev.")
        }
        for (let i = 1; i < res.length; i++) classArray.unshift(res[i].name)
        cEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${classArray.join('\n+ ')}\`\`\``, true)
        if (choosenRace !== 'nd') return message.channel.send(cEmbed).then(msg => msg.delete(15001))
      }
      return console.log('---')
    })
  // 2. Message await - this will wait for user to type the desire class
  if (choosenRace !== 'nd') {
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: 15000,
        errors: ['time']
      }).then(collected => {
        if (collected.first().content.toLowerCase() !== '') choosenClass = collected.first().content.toLowerCase()
      })
      .catch(err => {
        console.log("[ERR10] " + err)
        return message.channel.send(`Please, give a valid CLASS!\nRestart the guide typing: \`${cmd}\`.`)
      })
  }
  // 3. Validation of the choice - if CLASS is valid the guide keep going.
  if (choosenClass !== 'nd') {
    await ModClass.findOne({
      namel: choosenClass
    }, (err, result) => {
      if (err) console.log("[ERR11] " + err)
      if (result === null) {
        choosenClass = 'nd'
        return message.channel.send(`Please, give a valid CLASS!\nRestart the guide typing: \`${cmd}\`.`)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      else {
        console.log(result.name)
      }
    })
  }
  // 1. Listing BACKGROUND for choose ----------------------------------------------------------
  let backArray = []
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
      console.log(res.length)
      if (eR) {
        console.log('[ERR12] ' + eR)
        return message.reply("GAMCHA12 - Try again later or contact the dev.")
      }
      if (!res) {
        console.log("[ERR13] Couldn't find result")
        return message.reply("GAMCHA13 - Try again later.")
      } else {
        // try {
        //   backArray.push(res[0].name)
        // } catch (err) {
        //   console.log('[ERR14] ' + err)
        //   return message.reply("GAMCHA14 - Try again later or contact the dev.")
        // }
        // for (let i = 1; i < res.length; i++) backArray.unshift(res[i].name)
        bEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${backArray.join('\n+ ')}\`\`\``, true)
        if (choosenClass !== 'nd') return message.channel.send(bEmbed).then(msg => msg.delete(15001))
      }
    })
  // 2. Message await - this will wait for user to type the desire class
  if (choosenClass !== 'nd' && choosenRace !== 'nd') {
    await message.channel.awaitMessages(filter, {
        max: 1,
        time: 15000,
        errors: ['time']
      }).then(collected => {
        if (!collected.first().content) choosenBack = ''
        else choosenBack = collected.first().content.toLowerCase()
      })
      .catch(err => {
        console.log("[ERR15] " + err)
        return message.channel.send(`Please, give a valid CLASS!\nRestart the guide typing: \`${cmd}\`.`)
      })
  }
  // 3. Validation of the choice - if BACKGROUND is valid the guide keep going.
  if (choosenBack !== 'nd') {
    await ModBack.findOne({
      namel: choosenBack
    }, (err, result) => {
      if (err) console.log("[ERR16] " + err)
      if (result === null) {
        choosenBack = 'nd'
        return message.channel.send(`Please, give a valid BACKGROUND!\nRestart the guide typing: \`${cmd}\`.`)
      }
      if (!result) return message.channel.send("Couldn't find any information.")
      else {
        console.log(result.name)
      }
    })
  }

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

  if (choosenRace !== 'nd' && choosenClass !== 'nd' && choosenBack !== 'nd') {
    message.channel.send(`\`\`\`diff\n+ User       > ${sender.username}
- Race       > ${choosenRace.toUpperCase()}
- Class      > ${choosenClass.toUpperCase()}
- Background > ${choosenBack.toUpperCase()}\`\`\``)
  }
}

module.exports.config = {
  name: "new",
  aliases: []
}

//Simbols: alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼