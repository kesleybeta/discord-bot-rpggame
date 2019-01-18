const Discord = require("discord.js")
const ModBackground = require("../models/mod-background.js")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

  if (!args.toString()) {
    let embed = new Discord.RichEmbed()
      .setAuthor("D&D Beyond", "https://media-waterdeep.cursecdn.com/avatars/104/378/636511944060210307.png")
      .setDescription("Your character’s background reveals where you came from, how you became an adventurer, and your place in the world.")
      .setColor("#69db83")

    let backArray = []
    ModBackground.find({
        source: "basicrules"
      })
      .sort([
        [
          'name',
          'descending'
        ]
      ])
      .exec((err, res) => {
        //console.log('res' + res)
        //message.channel.send(res.slice(-res.length + 100))
        if (err) return console.log('erro' + err)
        else {
          backArray.push(res[0].name)
          for (let i = 1; i < res.length; i++) backArray.unshift(res[i].name)
        }
        embed.addField("Backgrounds: ", `\`\`\`diff\n+ ${backArray.join('\n+ ')}\`\`\``)
        return message.channel.send(embed)
      })
  } else {
    let specificBack = args.toString().toLowerCase()
      .split(",")
      .join(" ")
    let cembed = new Discord.RichEmbed()
      .setColor("#69db83")

    ModBackground.findOne({
      namel: specificBack
    }, (err, result) => {
      if (err) console.log("[2] " + err)
      if (result === null) return message.reply(`Please, give a valid BACKGROUND! Type \`${cmd}\` to see the classes's list.`)
      if (!result) {
        cembed.setDescription("Couldn't find any information.")
        return message.channel.send(cembed)
      } else {
        cembed
          //.setAuthor("Classes's Manual", `${result.icon}`)
          .setAuthor("Classes's Manual", "https://media-waterdeep.cursecdn.com/avatars/104/378/636511944060210307.png")
          .setTitle(`${result.name} `)
          .setThumbnail(`${result.thumb}`)
          .setDescription(`${result.description}`)
        return message.channel.send(cembed)
      }
    })
  }
}

module.exports.config = {
  name: "background",
  aliases: ["back"]
}