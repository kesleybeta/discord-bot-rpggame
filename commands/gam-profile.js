const Discord = require("discord.js")
const ModProfile = require("../models/mod-character.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    let target = message.mentions.users.first() || message.author

    let embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setTitle(`YOUR CHARACTER SHEET`)
        .setDescription("This place will be filled with your characters information!")

    ModProfile.findOne({
        userID: target.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) return console.log(target.id + "GP01 " + err)
        if (result === null) return message.reply(target.id + "GP02 - Contact the dev")
        if (!result) {
            //embed.addField("Log", `You're new here so, a new profile was created.`, true)
            message.reply(`\nYou're new here so, a new profile has to be created.\nType \`new\` to build your character.`)
        } else {
            embed
                //.setThumbnail(message.author.displayAvatarURL)
                .addField("Name", `\`${result.characters.name} \``, true)
                .addField("Race", `\`${result.characters.race} \``)
                .addField("Class", `\`${result.characters.class} \``, true)
                .addField("Background", `\`${result.characters.background} \``)
                .addField("Attributes", `\`
STR: ${result.characters.attributes.str}
CON: ${result.characters.attributes.con}
DEX: ${result.characters.attributes.dex}
INT: ${result.characters.attributes.int}
WIS: ${result.characters.attributes.wis}
CHA: ${result.characters.attributes.cha}\`
                `)

            message.channel.send(embed)
        }
    })
}

module.exports.config = {
    name: "profile",
    aliases: [
        "p",
        "sheet"
    ]
}