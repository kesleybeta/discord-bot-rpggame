module.exports.run = async (message, cmd) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  // Code lines
  return message.reply("bar")
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}