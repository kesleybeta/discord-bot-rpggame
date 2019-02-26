/* eslint-disable no-underscore-dangle */
const Discord = require("discord.js")
const tools = require("../util/functions") // Require global functions
// const capitalize = require("capitalize")
// Require lowdb and then FileSync
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fileArmor = low(new FileSync('./jsonfiles/equipment/equiparmor.json', 'utf8'))
const fileGear = low(new FileSync('./jsonfiles/equipment/equipgear.json', 'utf8'))
const fileWeapon = low(new FileSync('./jsonfiles/equipment/equipweapon.json', 'utf8'))
const fileTools = low(new FileSync('./jsonfiles/equipment/equiptools.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Treatment
  //if (!args) message.reply("Usage: `feature` `your class` `level`")
  // Variables
  let embed = new Discord.RichEmbed()
  let jArmor = fileArmor.value()
  let jGear = fileGear.value()
  let jWeapon = fileWeapon.value()
  let jTools = fileTools.value()
  let armorEmbed = new Discord.RichEmbed()

  if (!args[0]) {
    embed.setAuthor("Starting Equipment", "https://i.imgur.com/rYEcZ71.png")
    .setColor("#3bb5f7")
    embed.setDescription(`When you create your character, you receive equipment based on a combination of your class and background.\n
    **Armor and Shields**:\n\`\`\`fix\n${jArmor._list.join(', ')}\`\`\`
    `)
    return message.channel.send(embed)
  }

  if (args[0] === "armor") {
    armorEmbed.setAuthor("Starting Equipment", "https://i.imgur.com/HLBnf72.png")
      .setThumbnail("https://i.imgur.com/vCSeQpe.png")
      .setColor("#42f48f")
      .setDescription(`${jArmor._description}`)
      .addField("Armor and Shields", `\`\`\`css\n[Light Armor]\n• ${jArmor.light._list.join(', ')}\n\n[Medium Armor]\n• ${jArmor.medium._list.join(', ')}\n
[Heavy Armor]\n• ${jArmor.heavy._list.join(', ')}\n\n[Shields]\n• ${jArmor.shield._list.join(', ')}\n\`\`\``, true)
    return message.channel.send(armorEmbed)
  }
}

module.exports.config = {
  name: "equipment",
  aliases: ["equip"]
}