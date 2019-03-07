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
    embed.setAuthor("Starting Equipment", "https://i.imgur.com/oJIca3B.png")
      .setColor("#ff6e42")
      .setThumbnail("https://i.imgur.com/bEfQkGz.png")
      .setFooter("More info usage: `equip (equipment)`")
      .setDescription(`When you create your character, you receive equipment based on a combination of your class and background.\n
**Armor and Shields** (*armor*):\n\`\`\`fix\n• ${jArmor._categorylist.join(', ')}\`\`\`
**Adventuring Gear** (*gear*):\n\`\`\`fix\n• ${jGear._list.join(', ')}\`\`\`
**Weapons** (*weapons*):\n\`\`\`fix\n• ${jWeapon._typelist.join(', ')}\`\`\`
**Tools** (*tools*):\n\`\`\`fix\n• ${jTools._list.join(', ')} tools\`\`\`
**Equipment Packs** (*packs*):\n\`\`\`fix\n• ${jPacks._list.join('\'s pack, ')}'s pack\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "armor") {
    embed.setAuthor("Armor and Shields", "https://i.imgur.com/oJIca3B.png")
      .setFooter(`More info cmd usage: armor <specific armor>`)
      .setColor("#42f48f")
      .setDescription(`\`\`\`css\n[Light Armor]\n• ${fileArmor.filter({category: 'light'}).sortBy('name').map('name').value().join(', ')}\n
[Medium Armor]\n• ${fileArmor.filter({category: 'medium'}).sortBy('name').map('name').value().join(', ')}\n
[Heavy Armor]\n• ${fileArmor.filter({category: 'heavy'}).sortBy('name').map('name').value().join(', ')}\n
[Shields]\n• ${fileArmor.filter({category: 'shield'}).sortBy('name').map('name').value().join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "gear") {
    embed.setAuthor("Adventuring Gear", "https://i.imgur.com/oJIca3B.png")
      .setColor("#f4bf42")
      .setFooter("More info usage: gear <specific gear>")
      .setDescription(`\`\`\`css\n[Gear]\n• ${jGear._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "weapons") {
    embed.setAuthor("Weapons", "https://i.imgur.com/oJIca3B.png")
      .setColor("#226f89")
      .setFooter("More info usage: weapon <specific weapon>")
      .setDescription(`\`\`\`css\n[Simple melee]\n• ${jWeapon.simple.melee._list.join(', ')}\n
[Simple ranged]\n• ${jWeapon.simple.ranged._list.join(', ')}\n
[Martial melee]\n• ${jWeapon.martial.melee._list.join(', ')}\n
[Martial ranged]\n• ${jWeapon.martial.ranged._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "tools") {
    embed.setAuthor("Tools", "https://i.imgur.com/oJIca3B.png")
      .setFooter("More info usage: tool <specific tool>")
      .setDescription(`\`\`\`css\n[Tools]\n• ${jTools._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (args[0] === "packs") {
    embed.setAuthor("Equipment Packs", "https://i.imgur.com/oJIca3B.png")
      .setFooter("More info usage: pack <specific pack>")
      .setDescription(`\`\`\`css\n[All packs]\n• ${jPacks._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
}

module.exports.config = {
  name: "equipment",
  aliases: ["equip"]
}