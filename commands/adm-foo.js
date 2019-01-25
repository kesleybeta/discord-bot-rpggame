const tools = require("../util/functions")

module.exports.run = async (message, cmd, args) => {
  await message.delete()
  // Logging
  await console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
  // Variables
  let min = Math.ceil(8)
  let max = Math.floor(15)

  let basestr = Math.floor(Math.random() * (max - min + 1)) + min
  let basedex = Math.floor(Math.random() * (max - min + 1)) + min
  let basecon = Math.floor(Math.random() * (max - min + 1)) + min
  let baseint = Math.floor(Math.random() * (max - min + 1)) + min
  let basewis = Math.floor(Math.random() * (max - min + 1)) + min
  let basecha = Math.floor(Math.random() * (max - min + 1)) + min
  let modstr = tools.modifier(basestr)
  let moddex = tools.modifier(basedex)
  let modcon = tools.modifier(basecon)
  let modint = tools.modifier(baseint)
  let modwis = tools.modifier(basewis)
  let modcha = tools.modifier(basecha)
  // Code lines
  await new Promise(resolve => setTimeout(resolve, 5000))
  await console.log('mods: str %d dex %d con %d int %d wis %d cha %d', modstr, moddex, modcon, modint, modwis, modcha)
}

module.exports.config = {
  name: "foo",
  aliases: [""]
}