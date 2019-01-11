const Discord = require("discord.js")
const fs = require("fs")
const modRaces = require("../models/mod-races.js")
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'))

// 1. RACE
// 2. CLASS
// 3. BACKGROUND
// tcreate 1 vai direto pra RACE
// tcreate 2 vai direto pra CLASS
// tcreate 3 vai direto pra BACKGROUND

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (args.toString()) {
        if(isNaN(args)) return message.reply("IT'S Not A Number")
        if (args.toString() === '1') return message.reply("You will set the RACE")
    }

    let stembed = new Discord.RichEmbed()
        .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setColor("#808080")
        .setDescription(`
            — To start your new adventure I'll need your card number... *ha.. haha.. just kidding, this doesn't exist here.. ~yet~?*

            — Let's create your new **CHARACTER** ?? ▼
        `)

    let rEmbed = new Discord.RichEmbed()
        .setTitle("1. CHOOSE YOUR CHARACTER'S RACE")
        .setColor("#00D0FF")
        .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
        .setDescription(`
            • Every character belongs to a race.
            • The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.
        `)
        .setFooter("You'll have `15 seconds` to type your desired race.")

    let raceArray = []

    const filter = (reaction, user) => [
        '✅',
        '❎'
    ].includes(reaction.emoji.name) && user.id === message.author.id

    message.channel.send(stembed).then(async msg => {
        await msg.react('✅')
        await msg.react('❎')

        msg
            .awaitReactions(filter, {
                max: 1,
                time: 15000,
                errors: ['time']
            })
            .then(collected => {
                const reaction = collected.first()
                switch (reaction.emoji.name) {
                    case '❎':
                        message.channel.bulkDelete(1).catch(err => message.reply("ERRGAMCRE05 - Try again later or contact the dev."))
                        return message.reply("Come back later!")
                    case '✅':
                        message.channel.bulkDelete(1).catch(err => message.reply("ERRGAMCRE05 - Try again later or contact the dev."))  
                        message.reply("Let's start so!")
                        modRaces
                            .find({
                                edition: "5th"
                            })
                            .sort([
                                [
                                    'name',
                                    'descending'
                                ]
                            ])
                            .exec((err1, res) => {
                                if (err1) {
                                    return message.reply("ERRGAMCRE01 - Try again later or contact the dev.")
                                }
                                if (res.length === 0) return message.reply("ERRGAMCRE02 - Try again later or contact the dev.")
                                if (res === null) return message.reply("ERRGAMCRE03 - Try again later or contact the dev.")
                                if (!res) {
                                    rEmbed.setFooter("From JSON file. Not connected to DB.").addField(`↘ Choose`, jsonRaces.allraces.join(', '), true)
                                    return message.channel.send(rEmbed).then(msg => msg.delete(15000))
                                } else {
                                    try {
                                        raceArray.push(res[0].name)
                                    } catch (err4) {
                                        return message.reply("ERRGAMCRE04 - Try again later or contact the dev.")
                                    }
                                    for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)

                                    rEmbed.addField(`↙ Choose one`, `\`\`\`diff\n+ ${raceArray.join('\n+ ')}\`\`\``, true)
                                    return message.channel.send(rEmbed).then(msg => msg.delete(15000))
                                }
                            })
                        break
                    default:
                        return message.channel.send("¯\\_(ツ)_/¯")
                }
            })
            .catch(collected => {
                console.log(collected)
//                message.channel.bulkDelete(1).catch(err => message.reply("ERRGAMCRE05 - Try again later or contact the dev."))
                return message.reply("I couldn't do any!")
            })
        //.then(msg => msg.delete(5000))
    })
}

module.exports.config = {
    name: "create",
    aliases: ["new"]
}

//Simbols: alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼