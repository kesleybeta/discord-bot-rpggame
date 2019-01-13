const Discord = require("discord.js")
const ModProfile = require("../models/mod-character.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}:${args[0]}] requested by: [${message.author.tag}]`)
    let target = message.mentions.users.first() || message.author

    let embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setTitle(`YOUR CHARACTER SHEET`)
        .setDescription("This place will be filled with your characters information!")

    ModProfile.findOne({
        userID: target.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) return console.log(target.id + "GAMPRO01 " + err)
        if (result === null) return message.reply(target.id + "GAMPRO02 - Contact the dev")
        if (!result) {
            //embed.addField("Log", `You're new here so, a new profile was created.`, true)
            message.reply(`\nYou're new here so, a new profile has to be created.\nType \`new\` to build your character.`)
        } else {
            let reschar = result.characters
            let resattr = reschar.attributes
            embed
                //.setThumbnail(message.author.displayAvatarURL)
                .addField("Name", `\`${reschar.name} \``, true)
                .addField("Race", `\`${reschar.race} \``, true)
                .addField("Class", `\`${reschar.class} \``, true)
                .addField("Background", `\`${reschar.background} \``, true)
                //.addField("Attributes", `\`STR: ${resattr.str.total} | CON: ${resattr.con} | DEX: ${resattr.dex} | INT: ${resattr.int} | WIS: ${resattr.wis} | CHA: ${resattr.cha}\``)
                .addField("Attributes", `\`STR: ${resattr.str.total}
CON: ${resattr.con}
DEX: ${resattr.dex}
INT: ${resattr.int}
WIS: ${resattr.wis}
CHA: ${resattr.cha}\`
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