const tools = require("../util/functions")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let min = Math.ceil(8)
  let max = Math.floor(18)

  let basestr = await Math.floor(Math.random() * (max - min + 1)) + min
  let basedex = await Math.floor(Math.random() * (max - min + 1)) + min
  let basecon = await Math.floor(Math.random() * (max - min + 1)) + min
  let baseint = await Math.floor(Math.random() * (max - min + 1)) + min
  let basewis = await Math.floor(Math.random() * (max - min + 1)) + min
  let basecha = await Math.floor(Math.random() * (max - min + 1)) + min

  let modstr = await tools.modifier(basestr)
  let moddex = await tools.modifier(basedex)
  let modcon = await tools.modifier(basecon)
  let modint = await tools.modifier(baseint)
  let modwis = await tools.modifier(basewis)
  let modcha = await tools.modifier(basecha)
  // Code lines
  message.reply(`♠ Here's your random ability scores\n\`Str: ${basestr} | Mod: ${modstr}\nDex: ${basedex} | Mod: ${moddex}\nCon: ${basecon} | Mod: ${modcon}\nInt: ${baseint} | Mod: ${modint}\nWis: ${basewis} | Mod: ${modwis}\nCha: ${basecha} | Mod: ${modcha}\``)
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}