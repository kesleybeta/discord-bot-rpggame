/* eslint-disable no-underscore-dangle */
const Discord = require('discord.js')
//const tools = require("../util/functions") // Require global functions
const low = require('lowdb') // Require lowdb and then FileSync
const FileSync = require('lowdb/adapters/FileSync')
const fileWeapon = low(new FileSync('./jsonfiles/equipment/equipweapon.json', 'utf8'))
const capitalize = require("capitalize")
module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let weap = fileWeapon.value()
  let weapembed = false
  let embed = new Discord.RichEmbed()
  let jWeapon = fileWeapon.value()

  // let simmelList = fileWeapon.filter({
  //   category: 'simple melee'
  // }).sortBy('name').map('name').value().join(', ')
  

  // Treatment
  if (!args[0]) {
    embed.setAuthor("Weapons", "https://i.imgur.com/vkjgoxO.png") //"https://i.imgur.com/wA3z7jK.png")
      .setColor("#226f89")
      .setThumbnail("https://i.imgur.com/vkjgoxO.png")
      .setFooter(`More info usage: ${cmd} <specific weapon>`)
      .setDescription(`${jWeapon._description.weapon}\n\n\`\`\`css
[Simple melee]\n• ${simmelList}\n
[Simple ranged]\n• ${simranList}\n
[Martial melee]\n• ${marmelList}\n
[Martial ranged]\n• ${marranList}\n\`\`\``)
    return message.channel.send(embed)
  }
  if (fileWeapon.has(args.join(' ').toLowerCase()).value()) {
    weap = fileWeapon.get(args.join(' ').toLowerCase()).value()
    weapembed = true
  }
  // Code lines
  if (weapembed) {
    embed.setAuthor(`${weap.name} `, "https://i.imgur.com/kvGJP52.png")
      .setColor("#226f89")
      .setThumbnail(weap.thumb)
      .setDescription(`${weap.description}`)
      .addField("Damage", `${weap.damage[0]}D${weap.damage[1]} : *${weap.type}*`, true)
      .addField("Cost", `${weap.cost[0]} ${weap.cost[1]}`, true)
      .addField("Weight", `${weap.weight} lb.`, true)
      .addField("Properties", `${weap.properties.join(', ') || "---"}`)
      .addField("Category", `${capitalize.words(weap.category)}`, true)
    return message.channel.send(embed)
  }
  return message.channel.send("Nothing matched")
}

module.exports.config = {
  name: "infoarmor",
  aliases: ["infarm"]
}