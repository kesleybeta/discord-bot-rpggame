const Discord = require("discord.js")
const capitalize = require("capitalize")
// Require lowdb and then FileSync
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const jsonClass = low(new FileSync('./jsonfiles/char/charclasses.json', 'utf8'))
const jsonCharCreation = low(new FileSync('./jsonfiles/charcreation.json', 'utf8'))

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let thisClass = {}
  let specificClass = ""
  let allClassesEmbed = new Discord.RichEmbed()
    .setColor("#65D8D6")
    .setAuthor("D&D Beyond", "https://i.imgur.com/LaznxhN.png")
    .setDescription(`Class is the primary definition of what your character can do.
      It’s more than a profession; it’s your character’s calling.
      Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse.`)
    .addField(`CLASSES`, `\`\`\`diff\n+ ${jsonCharCreation.get('allclasses').value().join('\n+ ')}\`\`\``, true)

  let classEmbed = new Discord.RichEmbed()
    .setColor("#65D8D6")

  if (!args[0]) return message.channel.send(allClassesEmbed)


  specificClass = args.toString().toLowerCase()
  if (message.content.split(' ').find(el => el === ".full") === ".full") {
    specificClass = await specificClass.split(',')
    specificClass.pop()
    specificClass = await specificClass.join(' ')
  }
  specificClass = await specificClass.split(',').join(' ')

  thisClass = jsonClass.get(String(specificClass)).value()

  classEmbed.setAuthor(thisClass.name, thisClass.icon)
    .setDescription(thisClass.description)
    .setThumbnail(thisClass.thumb)

  if (message.content.split(' ').find(el => el === '.full') === '.full') {
    classEmbed.addField("Starting Equipment", `\`\`\`css
[Armor  ] : ${thisClass.equip.armor.join(', ')}
[Gear   ] : ${thisClass.equip.gear.join(', ')}
[Pack   ] : ${thisClass.equip.pack.join(', ')}
[Tools  ] : ${thisClass.equip.tools.join(', ')}
[Weapons] : ${thisClass.equip.weapons.join(', ')}
\`\`\``, true)
      .addField("Hit Points", `\`\`\`css
[Hit Dice     ] : ${"1d" + thisClass.hp.hitdice} per ${thisClass.namel} level
[HP at 1st Lvl] : ${thisClass.hp.hpfirst} + your Con modifier
[HP after 1st ] : ${thisClass.hp.hplvl} + your Con modifier
\`\`\``, true)
      .addField("Proficiencies", `\`\`\`css
[Armor        ] : ${thisClass.prof.armor.join(', ')}
[Saving throws] : ${thisClass.prof.savthrows.join(', ')}
[Skills       ] : ${thisClass.prof.skills.join(', ')}
[Tools        ] : ${thisClass.prof.tools.join(', ')}
[Weapons      ] : ${thisClass.prof.weapons.join(', ')}
\`\`\``, true)
  }

  return message.channel.send(classEmbed)

}


module.exports.config = {
  name: "class",
  aliases: ["classes"]
}