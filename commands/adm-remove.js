const ModCharacter = require("../models/mod-character") // Require profile schema

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  // Code lines
  if (!args) return message.reply("Please, tell me what you wanna remove")

  if (args[0] === "profile") {
    if (isNaN(args[1])) return message.reply("Please give a valid character ID!")

    await ModCharacter.findOneAndUpdate({
      userID: message.author.id,
      serverID: message.guild.id
    }, {
      $set: {
        characters: {}
      }
    }).then(message.reply("Deu certo?"))
    // .select('characters')
    // .exec(async (e, result) => {
    //   if (e) return message.reply("ERR#ADMREM01 - An error occurred.  Try contacting the dev.").then(console.log('[ERR01] ' + e))
    //   if (!result || result === null) await message.reply("Profile not found!")
    //   else {
    //     console.log(result)
    //     //return message.channel.send(`• Remove a character. ► HIS NAME: *${result.characters.name}*`)
    //   }
    // })
  }

}

module.exports.config = {
  name: "remove",
  aliases: ["del"]
}