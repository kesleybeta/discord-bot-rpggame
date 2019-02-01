const tools = require("../util/functions") // Require global functions

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  // Code lines
  message.channel.send(tools.rollfourdsix())
  return message.channel.send(`BAR`)
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}