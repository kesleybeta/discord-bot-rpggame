/* eslint-disable no-underscore-dangle */
const Discord = require('discord.js')
//const tools = require("../util/functions") // Require global functions
const low = require('lowdb') // Require lowdb and then FileSync
const FileSync = require('lowdb/adapters/FileSync')
const fileWeapon = low(new FileSync('./jsonfiles/equipment/equipweapon.json', 'utf8'))
// const capitalize = require("capitalize")
module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let weap = fileWeapon.value()
  let weapembed = false
  let embed = new Discord.RichEmbed()
  let jWeapon = fileWeapon.value()
  // Treatment
  if (!args[0]) {
    embed.setAuthor("Weapons", "https://i.imgur.com/wA3z7jK.png")
      .setColor("#226f89")
      .setThumbnail("https://i.imgur.com/vkjgoxO.png")
      .setFooter("More info usage: weapon <specific weapon>")
      .setDescription(`${jWeapon._description}\n\n\`\`\`css
[Simple melee]\n• ${jWeapon.simple.melee._list.join(', ')}\n
[Simple ranged]\n• ${jWeapon.simple.ranged._list.join(', ')}\n
[Martial melee]\n• ${jWeapon.martial.melee._list.join(', ')}\n
[Martial ranged]\n• ${jWeapon.martial.ranged._list.join(', ')}\n\`\`\``)
    return message.channel.send(embed)
  }
  // Code lines
  if (fileWeapon.has('simple.melee.' + args.join(' ').toLowerCase()).value()) {
    weap = fileWeapon.get('simple.melee.' + args.join(' ').toLowerCase()).value()
    embed.addField('Classification', 'Simple Melee')
    weapembed = true
  }
  if (fileWeapon.has('simple.ranged.' + args.join(' ').toLowerCase()).value()) {
    weap = fileWeapon.get('simple.ranged.' + args.join(' ').toLowerCase()).value()
    embed.addField('Classification', 'Simple Ranged')
    weapembed = true
  }
  if (fileWeapon.has('martial.melee.' + args.join(' ').toLowerCase()).value()) {
    weap = fileWeapon.get('martial.melee.' + args.join(' ').toLowerCase()).value()
    embed.addField('Classification', 'Martial Melee')
    weapembed = true
  }
  if (fileWeapon.has('martial.ranged.' + args.join(' ').toLowerCase()).value()) {
    weap = fileWeapon.get('martial.ranged.' + args.join(' ').toLowerCase()).value()
    embed.addField('Classification', 'Martial Ranged')
    weapembed = true
  }
  if (weapembed) {
    embed.setAuthor(`${weap.name} `, "https://i.imgur.com/kvGJP52.png")
      .setColor("#226f89")
      .setDescription(`${weap.description}`)
      .addField("Damage", `${weap.damage[0]}D${weap.damage[1]} : *${weap.type}*`, true)
      .addField("Cost", `${weap.cost[0]} ${weap.cost[1]}`, true)
      .addField("Weight", `${weap.weight} lb.`, true)
      .addField("Properties", `${weap.properties.join(', ') || "---"}`)
    return message.channel.send(embed)
  }
  return message.channel.send("Nothing matched")
}

module.exports.config = {
  name: "weapon",
  aliases: ["weapons", "weap", "arma", "armas"]
}