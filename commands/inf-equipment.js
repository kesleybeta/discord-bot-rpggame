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
    embed.setAuthor("Starting Equipment", "https://i.imgur.com/rYEcZ71.png")
      .setColor("#3bb5f7")
      .setFooter("More info usage: `uequip (content)`")
      .setDescription(`When you create your character, you receive equipment based on a combination of your class and background.\n
    **Armor and Shields**: (*armor*)\n\`\`\`fix\n${jArmor._list.join(', ')}\`\`\`
    **Adventuring Gear**: (*gear*)\n\`\`\`fix\n${jGear._list.join(', ')}\`\`\`
    **Weapons**: (*weapon*)\n\`\`\`fix\n${jWeapon._list.join(', ')}\`\`\`
    **Tools**: (*tools*)\n\`\`\`fix\n${jTools._list.join(', ')} tools\`\`\`
    **Equipment Packs**: (*packs*)\n\`\`\`fix\n${jPacks._list.join('\'s pack, ')}'s pack\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "armor") {
    embed.setAuthor("Armor and Shields", "https://i.imgur.com/HLBnf72.png")
      .setThumbnail("https://i.imgur.com/vCSeQpe.png")
      .setFooter("More info usage: uequip armor <specific armor>")
      .setColor("#42f48f")
      .setDescription(`${jArmor._description}\n\n\`\`\`css
[Light Armor]\n• ${jArmor.light._list.join(', ')}\n
[Medium Armor]\n• ${jArmor.medium._list.join(', ')}\n
[Heavy Armor]\n• ${jArmor.heavy._list.join(', ')}\n
[Shields]\n• ${jArmor.shield._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "gear") {
    embed.setAuthor("Adventuring Gear", "")
      .setFooter("More info usage: ugear <specific gear>")
      .setDescription(`${jGear._description}\n
**Gear**:\n\`\`\`md\n${jGear._list.join(', ')}\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "weapon") {
    embed.setAuthor("Weapons", "")
      .setFooter("More info usage: uweapon <specific weapon>")
      .setDescription(`${jWeapon._description}\n\n\`\`\`css
[Simple melee]\n• ${jWeapon.simple.melee._list.join(', ')}\n
[Simple ranged]\n• ${jWeapon.simple.ranged._list.join(', ')}\n
[Martial melee]\n• ${jWeapon.martial.melee._list.join(', ')}\n
[Martial ranged]\n• ${jWeapon.martial.ranged._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "tools") {
    return message.reply('• ' + jTools._list)
  }
}

module.exports.config = {
  name: "equipment",
  aliases: ["equip"]
}