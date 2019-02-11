const Discord = require("discord.js")
const ModClass = require("../models/mod-class.js")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

  if (!args.toString()) {
    let embed = new Discord.RichEmbed()
      .setAuthor("D&D Beyond", "https://media-waterdeep.cursecdn.com/avatars/104/378/636511944060210307.png")
      .setDescription("Class is the primary definition of what your character can do.\nIt’s more than a profession; it’s your character’s calling.")
      .setColor("#65D8D6")

    let classArray = []
    ModClass.find({
        source: "handbook"
      }).sort([
        [
          'name',
          'descending'
        ]
      ])
      .exec((err, res) => {
        if (err) return console.log('erro' + err)
        classArray.push(res[0].name)
        for (let i = 1; i < res.length; i++) classArray.unshift(res[i].name)

        embed.addField("Classes:", `\`\`\`diff\n+ ${classArray.join('\n+ ')}\`\`\``)
        return message.channel.send(embed)
      })
  } else {
    let specificClass = args.toString().toLowerCase()
      .split(",")
      .join(" ")
    let cembed = new Discord.RichEmbed()
      .setColor("#65D8D6")

    ModClass.findOne({
      namel: specificClass
    }, (err, result) => {
      if (err) console.log("[2] " + err)
      if (result === null) return message.reply(`Please, give a valid CLASS! Type \`${cmd}\` to see the classes's list.`)
      if (!result) {
        cembed.addField("Classes:", "Couldn't find any information.")
        return message.channel.send(cembed)
      } else {
        cembed.setAuthor("Classes's Manual", `${result.icon}`)
          .setTitle(`${result.name} `)
          .setThumbnail(`${result.thumb}`)
          .setDescription(`${result.description}`)
        return message.channel.send(cembed)
      }
    })
  }
}

module.exports.config = {
  name: "class",
  aliases: ["classes"]
}