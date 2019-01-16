const Discord = require("discord.js")
const modRaces = require("../models/mod-races.js")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

  if (!args.toString()) {
    let rEmbed = new Discord.RichEmbed()
      .setAuthor("D&D Beyond", "https://media-waterdeep.cursecdn.com/avatars/104/378/636511944060210307.png")
      .setDescription("Your choice of race affects many different aspects of your character. It establishes fundamental qualities that exist throughout your character’s adventuring career.")
      .setColor("#9665d8")

    let raceArray = []
    modRaces.find({
        source: "handbook"
      }).sort([
        [
          'name',
          'descending'
        ]
      ])
      .exec((err, res) => {
        if (err) return console.log('erro' + err)
        raceArray.push(res[0].name)
        for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)

        rEmbed.addField("Races:", `\`\`\`diff\n+ ${raceArray.join('\n+ ')}\`\`\``)
        return message.channel.send(rEmbed)
      })
  } else {
    let specificRace = args.toString().toLowerCase()
      .split(",")
      .join(" ")
    let dembed = new Discord.RichEmbed()
      .setColor("#9665d8")

    modRaces.findOne({
      namel: specificRace
    }, (err, result) => {
      if (err) console.log("[2] " + err)
      if (result === null) return message.reply(`Please, give a valid RACE! Type \`${cmd}\` to see the race's list.`)
      if (!result) {
        dembed.addField("Races:", "Couldn't find any information.")
        return message.channel.send(dembed)
      } else {
        dembed
          .setAuthor("Races's Manual", `${result.icon}`)
          .setThumbnail(`${result.thumb}`)
          .setTitle(`${result.name} `)
          .setDescription(`${result.description}`)
          // .addField("Age", `**Adult**: ***${result.age.adult}*** | **Max**: ***${result.age.max}*** `, true)
          // .addField("Alignment", `***${result.alignment}*** `, true)
          // .addField("Speed", `***${result.speed}*** `, true)
          // .addField("Languages", `***${result.languages.join(', ')}*** `, true)
          // .addField("Features", `***${result.features.join(', ')}*** `, true)
          // .addField("Subraces", `***${result.subraces.join(', ') || "None"}*** `, true)
        return message.channel.send(dembed)
      }
    })
  }
}

module.exports.config = {
  name: "races",
  aliases: ["race"]
}