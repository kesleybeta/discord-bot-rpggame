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
  let embed = new Discord.RichEmbed()
  // Treatment
  if (!args[0]) {
    return message.channel.send('No args')
  }
  // Code lines
  if (fileWeapon.has('simple.melee.' + String(args).toLowerCase()).value()) {
    let weap = fileWeapon.get('simple.melee.' + String(args).toLowerCase()).value()
    embed.setAuthor(`${weap.name} `, "https://i.imgur.com/kvGJP52.png")
      .setColor("#226f89")
      .setDescription(`${weap.description}`)
      //.setThumbnail(${weap.image.thumb})
      .addField("Cost", `BP: ${weap.cost.bp} SP: ${weap.cost.sp} GP: ${weap.cost.gp}`, true)
      .addField("Damage", `1D${weap.damage.hitdie} : ${weap.damage.type}`, true)
      .addField("Properties", `${weap.properties.join(', ') || "---"}`, true)
      .addField("Weight", `${weap.weight}lb.`, true)
    return message.channel.send(embed)
  }
  if (fileWeapon.has('simple.martial.' + String(args).toLowerCase()).value()) {
    let weap = fileWeapon.get('simple.martial.' + String(args).toLowerCase()).value()
    embed.setAuthor(`${weap.name} `, "https://i.imgur.com/kvGJP52.png")
      .setColor("#226f89")
      .setDescription(`${weap.description}`)
      //.setThumbnail(${weap.image.thumb})
      .addField("Cost", `BP: ${weap.cost.bp} SP: ${weap.cost.sp} GP: ${weap.cost.gp}`, true)
      .addField("Damage", `1D${weap.damage.hitdie} : ${weap.damage.type}`, true)
      .addField("Properties", `${weap.properties.join(', ') || "---"}`, true)
      .addField("Weight", `${weap.weight}lb.`, true)
    return message.channel.send(embed)
  }
  return message.channel.send('Nothing matched')
}

module.exports.config = {
  name: "weapon",
  aliases: ["weapons", "weap", "arma", "armas"]
}