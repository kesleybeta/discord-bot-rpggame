const tools = require("../util/functions") // Require global functions

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  // Code lines

  return message.channel.send(`BAR`)
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}

// const attachment = new Discord.Attachment('./card_images/sample.png', 'sample.png');
// const embed = new RichEmbed()
//         .setTitle('Wicked Sweet Title')
//         .attachFile(attachment)
//         .setImage('attachment://sample.png');
// message.channel.send({embed}).catch(console.error)