const Discord = require("discord.js")
const profileMod = require("../models/mod-profile.js")

module.exports.run = async (bot, message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    console.log(message.author.tag+" - "+message.author.id)

    let embed = new Discord.RichEmbed()
        .setColor("#103103")
        //.setThumbnail(message.author.displayAvatarURL)
        .setTitle(`Profile Character`)
        .setDescription("This place will be filled with your characters information.\nYOUR CHARACTER SHEET( POBRE )")

    profileMod.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) return console.log(chalk.bgRedBright(message.author.id+ "GP01 " + err))
        //if (result === null) return message.reply(message.author.id+ "GP02 - Contact the dev")
        if (!result) {
            const newProfile = new profileMod({
                userID: message.author.id,
                userTag: message.author.tag,
                serverID: message.guild.id,
                characters: {
                    name: "unknown",
                    race: "racao",
                    class: "nenhuma",
                    background: "wallpaper"
                }
            })
            newProfile.save().catch(err => console.log(chalk.redBright(message.author.id+ "GP03 newProfile.save() > " + err)))

            //embed.addField("Log", `You're new here so, a new profile was created.`, true)
            message.reply(`\nYou're new here so, a new profile was created.\nType \`{}start\` to build your character.`)
        } else {
            embed
            .addField("Name", `${result.characters.name} `, true)
            .addField("Race", `${result.characters.race} `, true)
            .addField("Class", `${result.characters.class} `, true)
            .addField("Background", `${result.characters.background} `, true)
            message.channel.send(embed)
        }
    })
}

module.exports.config = {
    name: "profile",
    aliases: ["p", "pfl"]
}