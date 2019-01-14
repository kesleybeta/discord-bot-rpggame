const Discord = require("discord.js")
const ModProfile = require("../models/mod-character") // Require profile schema
const ModCharacter = require("../models/mod-character") // Require character profile schema
const ModRaces = require("../models/mod-races") // Require races schema

// tcreate 1 vai direto pra RACE
// tcreate 2 vai direto pra CLASS
// tcreate 3 vai direto pra BACKGROUND

module.exports.run = async (message, cmd, args) => {
  await message.delete() // Deletes the command message
  if (String(args)) return message.reply("ERRGAMCHA00 - Please don't use arguments.") // Command must be without args
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`) // Logging the request of the command

  //Util variables
  let sender = message.author // For better code-read purposes
  const filter = msg => msg.author.id === sender.id
  let choosenRace = ''
  let choosenClass = ''
  let choosenBack = ''
  let embed = new Discord.RichEmbed() // An embed for character information
  embed
    .setAuthor(sender.tag, sender.avatarURL)
  let rEmbed = new Discord.RichEmbed() // An embed for races information
    .setTitle("1. CHOOSE YOUR CHARACTER'S RACE")
    .setColor("#00D0FF")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`
            • Every character belongs to a race.
            • The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.
        `)
    .setFooter("⏰ You'll have `15 seconds` to type your desired race.")
  let cEmbed = new Discord.RichEmbed() // An embed for races information
    .setTitle("2. CHOOSE YOUR CHARACTER'S CLASS")
    .setColor("#11D1FF")
    .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
    .setDescription(`
            • Class is the primary definition of what your character can do.
            • It’s more than a profession; it’s your character’s calling.  Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.
        `)
    .setFooter("⏰ You'll have `15 seconds` to type your desired race.")
  let dembed = new Discord.RichEmbed()
    .setTitle("RACE'S MANUAL")
    .setColor("#5D69D6")

  // Find Profile
  ModProfile
    .findOne({
      userID: sender.id,
      serverID: sender.id
    })
    .exec((err1, result) => {
      // ERROR handling
      if (err1) {
        console.log('[ERR01] ' + err1)
        return message.reply(sender.id + "GAMCHA01 - An error occurred.  Try contacting the dev.")
      }
      // RESULT handling
      if (!result) message.reply(`▼ A new one will be created. Follow the guide:`)
      else return message.reply(`► You already have a character. `)
    })

  let raceArray = []
  await ModRaces // Building the Race embed.
    .find({
      edition: "5th"
    })
    .sort([
      [
        'name',
        'descending'
      ]
    ])
    .exec((e, res) => {
      if (e) {
        console.log('[ERR02] ' + e)
        return message.reply(sender.id + "GAMCHA02 - Try again later or contact the dev.")
      }
      if (!res) {
        console.log("[ERR03] Couldn't find result")
        return message.reply(sender.id + "GAMCHA03 - Try again later or contact the dev.")
      } else {
        try {
          raceArray.push(res[0].name)
        } catch (err) {
          console.log('[ERR04] ' + err)
          return message.reply(sender.id + "GAMCHA05 - Try again later or contact the dev.")
        }
        for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)
        rEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${raceArray.join('\n+ ')}\`\`\``, true)
        message.channel.send(rEmbed)
      }
    })

  await message.channel.awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ['time']
    }).then(collected => {
      choosenRace = collected.first().content.toLowerCase()
      message.reply("You choose: **" + choosenRace.toUpperCase() + "** ?").then(msg => msg.delete(5000))
    })
    .catch(err => {
      console.log("[ERR06] " + err)
    })

  await ModRaces.findOne({
    namel: choosenRace
  }, (err, result) => {
    if (err) console.log("[ERR07] " + err)
    if (result === null) return message.reply(`Please, give a valid RACE! Restart the guide typing: \`${cmd}\`.`)
    if (!result) {
      dembed.setDescription("Couldn't find any information.")
      return message.channel.send(dembed)
    }
  })

  // message.channel.send(cEmbed)










  // ModRaces.findOne({
  //   namel: choosenRace
  // }, (err, result) => {
  //   if (err) console.log("[ERR07] " + err)
  //   if (result === null) return message.reply(`Please, give a valid RACE! Restart the guide typing: \`${cmd}\`.`)
  //   if (!result) {
  //     dembed.setDescription("Couldn't find any information.")
  //     return message.channel.send(dembed)
  //   } else {
  //     dembed
  //       .setThumbnail(`${result.iconurl}`)
  //       .setDescription(`${result.description}`)
  //       .addField("Name", `\*${result.name}\*`, true)
  //       .addField("Age", `Adult: *${result.age.adult}* | Max: *${result.age.max}* `, true)
  //       .addField("Ability score increase", `\`STR: ${result.abilityscore.str} | DEX: ${result.abilityscore.dex} | CON: ${result.abilityscore.con} | INT: ${result.abilityscore.int} | WIS: ${result.abilityscore.wis} | CHA: ${result.abilityscore.cha}\``)
  //       .addField("Alignment", `*${result.alignment}* `, true)
  //       .addField("Size", `*${result.size}* `, true)
  //       .addField("Speed", `*${result.speed}* `, true)
  //       .addField("Languages", `*${result.languages.join(', ')}* `, true)
  //       .addField("Features", `*${result.features.join(', ')}* `)
  //       .addField("Subraces", `${result.subraces.join(', ')} `)
  //     message.channel.send(dembed)
  //   }
  // })








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
  //         return message.reply(sender.id + "GAMCHA02 - Couldn't save your new profile")
  //     })
  // console.log('Start sleeping')
  // await new Promise(resolve => setTimeout(resolve, 5000))
  // console.log('Five seconds later')


  // else {
  //     let anewchar = result.characters
  //     if (anewchar.valid === 1) return message.reply(`► You already have a character. Named: *${anewchar.name}*`)
  //     if (anewchar.valid === 0) {
  //         console.log(anewchar)
  //         if (!anewchar.race) {
  //             message.reply("Let's choose a new race:") //Choosing a new RACE for the characater.
  //             return message.channel.send("Here will be the reading choices")
  //         }
  //     }

  // message.reply("► You already have a profile. Use the command `profile` to take a look")
  // if (result.characters.valid === 0) {
  //     message.reply(`► You didn't have a CHARACTER. A new one will be created.`)
  //     ModCharacter.findOneAndUpdate({
  //             userID: sender.id,
  //             serverID: message.guild.id
  //         }, {
  //             characters: {
  //                 valid: 1
  //             }
  //         })
  //         .then(message.reply("A new one will be created"))
  //         .catch(err => {
  //             console.log(err)
  //         })
  // } else {
  // }

}

module.exports.config = {
  name: "new",
  aliases: []
}

//Simbols: alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼