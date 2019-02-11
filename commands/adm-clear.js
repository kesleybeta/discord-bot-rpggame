module.exports.run = async (message, cmd, args) => {
  // Logging
  console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Local variables
  let toclear = 0
  // Code lines
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(" ¯\\_(ツ)_/¯")
  if (isNaN(args[0])) return message.reply(` ¯\\_(ツ)_/¯ *${args[0]} is not a number.*`)
  if (!args[0]) return message.reply(" ¯\\_(ツ)_/¯ *My crystal ball broke, please tell me, how many to clear?*")
  toclear = Number(args[0])
  if (toclear >= 100) return message.reply(" Value should be less than 100!")
  else {
    await message.channel.bulkDelete(toclear + 1).then(deletedMessages => {
        message.reply(` 👍 Cleared **${deletedMessages.size}** messages.`).then(clearedMsg => clearedMsg.delete(3000))
          .catch(console.error)
      })
      .catch(err => {
        message.reply(err.message).then(errMessage => errMessage.delete(3000))
          .catch(console.error)
      })
  }
}

module.exports.config = {
  name: "clear",
  aliases: [
    "cls",
    "rm"
  ]
}