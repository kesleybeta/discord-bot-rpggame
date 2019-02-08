const tools = require("../util/functions") // Require global functions
// const capitalize = require("capitalize")
module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Treatment
  if (!args) message.reply("Usage: `feature` `your class` `level`")
  // Variables
  let yourClass = args[0].toLowerCase()
  let level = args[1]
  if (!isNaN(level)) level = String(level)
  // Code lines
  return message.channel.send(`\`Class    : ${yourClass.toUpperCase()}\nLevel    : ${level}\nFeatures : ${tools.getFeature(yourClass, level)} \``)
}

module.exports.config = {
  name: "feature",
  aliases: ["fcl"]
}

// const attachment = new Discord.Attachment('./card_images/sample.png', 'sample.png');
// const embed = new RichEmbed()
//         .setTitle('Wicked Sweet Title')
//         .attachFile(attachment)
//         .setImage('attachment://sample.png');
// message.channel.send({embed}).catch(console.error)