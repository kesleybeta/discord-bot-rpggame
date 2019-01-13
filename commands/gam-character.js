const Discord = require("discord.js")
const ModCharacter = require("../models/mod-character") //.default

// tcreate 1 vai direto pra RACE
// tcreate 2 vai direto pra CLASS
// tcreate 3 vai direto pra BACKGROUND

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
    if (String(args)) return message.reply("ERRGAMCHA00 - Please don't use arguments.")

    let embed = new Discord.RichEmbed()
    embed.setAuthor(message.author.tag, message.author.avatarURL)
    // Find Profile
    ModCharacter
        .findOne({
            userID: message.author.id,
            serverID: message.guild.id
        })
        .exec((err, result) => {
            // ERROR handling
            if (err) return message.reply("ERRGAMCHA01 - An error occurred.  Try contacting the dev.")
            // RESULT handling
            //if (result === null) message.reply("Looks like your profile is empty. Try contacting the dev.")
            if (!result) {
                // Create a new profile
                message.reply(`▼ You didn't have a profile. A new one will be created.`)
                const newProfile = new ModCharacter({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    userTag: message.author.tag,
                    characters: {
                        id: 0,
                        valid: 0
                    }
                })
                newProfile
                    .save()
                    .then(message.reply("▲ A new PROFILE was created for you.")) // Use the command - \`profile\` - to take a look. This REPLY has to be placed on the end of the character creation.
                    .catch(err => {
                        console.log(err)
                        return message.reply(message.author.id + "GAMCHA02 - Couldn't save your new profile")
                    })
            }
            if (result.characters.valid === 1) return message.reply(`► You already have a character. Named: ***${result.characters.name}***`)
        })

    // message.reply("► You already have a profile. Use the command `profile` to take a look")
    // if (result.characters.valid === 0) {
    //     message.reply(`► You didn't have a CHARACTER. A new one will be created.`)
    //     ModCharacter.findOneAndUpdate({
    //             userID: message.author.id,
    //             serverID: message.guild.id
    //         }, {
    //             characters: {
    //                 valid: 1
    //             }
    //         })
    //         .then(message.reply("A new one will be created"))
    //         .catch(err => {
    //             console.log(err)
    //         })
    // } else {
    //     
    // }

}

module.exports.config = {
    name: "new",
    aliases: []
}

//Simbols: alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼