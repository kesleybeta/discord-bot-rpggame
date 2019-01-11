const Discord = require("discord.js")
const profileMod = require("../models/mod-profile.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setTitle(`YOUR CHARACTER SHEET`)
        .setDescription("This place will be filled with your characters information!")

    profileMod.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err, result) => {
        if (err) return console.log(chalk.bgRedBright(message.author.id+ "GP01 " + err))
        if (result === null) return message.reply(message.author.id+ "GP02 - Contact the dev")
        if (!result) {
            const newProfile = new profileMod({
                userID: message.author.id,
                userTag: message.author.tag,
                serverID: message.guild.id,
                characters: {
                    name: "",
                    race: "",
                    class: "",
                    background: ""
                }
            })
            newProfile.save().catch(err => console.log(chalk.redBright(message.author.id+ "GP03 newProfile.save() > " + err)))

            //embed.addField("Log", `You're new here so, a new profile was created.`, true)
            message.reply(`\nYou're new here so, a new profile was created.\nType \`{}create\` to build your character.`)
        } else {
            embed
            //.setThumbnail(message.author.displayAvatarURL)
            .addField("Name", `${result.characters.name} `, true)
            .addField("Race", `${result.characters.race} `, true)
            .addField("Class", `${result.characters.class} `, true)
            .addField("Background", `${result.characters.background} `)
            message.channel.send(embed)
        }
    })
}

module.exports.config = {
    name: "profile",
    aliases: ["sheet"]
}