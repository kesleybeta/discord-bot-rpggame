module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  // Code lines
  if (!args) return message.reply("Please, tell me what you wanna remove")
  
  return message.channel.send(`BAR`)
}

module.exports.config = {
  name: "remove",
  aliases: ["del"]
}