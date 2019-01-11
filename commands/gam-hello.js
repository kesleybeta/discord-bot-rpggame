const Discord = require("discord.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let helemb = new Discord.RichEmbed()
        .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setColor("#008080")
        .setTitle(`Hello ${message.author.username}`)
        .setDescription(`I am the *GM*.\nI'm here to guide you on your adventure.\nWell, If you are ready then type:\n\n\`\`\`diff\n+[create]\n---To create your new character.\n\`\`\`\n\`\`\`diff\n+[profile]\n---To see your new character profile.\n\`\`\``)

    message.channel.send(helemb)
}
module.exports.config = {
    name: "hello",
    aliases: ["qck"]
}