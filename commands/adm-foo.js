const tools = require("../util/functions")

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