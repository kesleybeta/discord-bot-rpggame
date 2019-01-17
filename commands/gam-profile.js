const Discord = require("discord.js")
const ModProfile = require("../models/mod-character.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    let target = message.mentions.users.first() || message.author

    let embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription("This place will be filled with your characters information!")

    ModProfile.findOne({
        userID: target.id,
        serverID: message.guild.id
    }, (e, result) => {
        if (e) return console.log("[GAMPRO01] " + e)
        if (result === null) return message.reply(`Sorry, no character found.`)
        if (!result) {
            //embed.addField("Log", `You're new here so, a new profile was created.`, true)
            message.reply(`\nYou're new here so, a new profile has to be created.\nType \`new\` to build your character.`)
        } else {
            let reschar = result.characters
            let resattr = reschar.attributes
            embed
                .setAuthor(`${target.username}'s CHARACTER SHEET`, "https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Helmet.jpg-512.png")
                .setThumbnail(reschar.thumb)
                .addField("Name", `\`${reschar.name} \``, true)
                .addField("Race", `\`${reschar.race} \``, true)
                .addField("Class", `\`${reschar.class} \``, true)
                .addField("Background", `\`${reschar.background} \``, true)
                .addField("Attributes", `\`STR: ${resattr.str.total}\nCON: ${resattr.con.total}\nDEX: ${resattr.dex.total}\nINT: ${resattr.int.total}\nWIS: ${resattr.wis.total}\nCHA: ${resattr.cha.total}\`\n`, true)
                .addField(`Hit Points`, `\`${reschar.hp.hpoints} \``, true)
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