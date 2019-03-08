/* eslint-disable no-underscore-dangle */
const Discord = require("discord.js")
// const tools = require("../util/functions") // Require global functions
// const capitalize = require("capitalize")
const low = require('lowdb') // Require lowdb and then FileSync
const FileSync = require('lowdb/adapters/FileSync')
const fileArmor = low(new FileSync('./jsonfiles/equipment/equiparmor.json', 'utf8'))
const fileGear = low(new FileSync('./jsonfiles/equipment/equipgear.json', 'utf8'))
const fileWeapon = low(new FileSync('./jsonfiles/equipment/equipweapon.json', 'utf8'))
const fileTools = low(new FileSync('./jsonfiles/equipment/equiptools.json', 'utf8'))
const filePacks = low(new FileSync('./jsonfiles/equipment/equippack.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let embed = new Discord.RichEmbed()
  let jArmor = fileArmor.value()
  let jGear = fileGear.value()
  let jWeapon = fileWeapon.value()
  let jTools = fileTools.value()
  let jPacks = filePacks.value()

  if (!args[0]) {
    embed.setAuthor("Starting Equipment", "https://i.imgur.com/bEfQkGz.png") //"https://i.imgur.com/oJIca3B.png")
      .setColor("#ff6e42")
      .setThumbnail("https://i.imgur.com/bEfQkGz.png")
      .setFooter("More info usage: `equip (equipment)`")
      .setDescription(`When you create your character, you receive equipment based on a combination of your class and background.\n
**Armor and Shields** (*infoarmor*):\n\`\`\`css\n• ${jArmor._list.category.join(', ')}\`\`\`
**Adventuring Gear** (*infogear*):\n\`\`\`css\n• ${jGear._list.join(', ')}\`\`\`
**Weapons** (*infoweapons*):\n\`\`\`css\n• ${jWeapon._list.category.join(', ')}\`\`\`
**Tools** (*infotools*):\n\`\`\`css\n• ${jTools._list.join(', ')} tools\`\`\`
**Equipment Packs** (*infopacks*):\n\`\`\`css\n• ${jPacks._list.join(', ')}'s pack\`\`\``)
    return message.channel.send(embed)
  }

}

module.exports.config = {
  name: "equipment",
  aliases: ["equip"]
}