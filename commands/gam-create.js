const Discord = require("discord.js")
const fs = require("fs")
const modRaces = require("../models/mod-races.js")
let jsonRaces = JSON.parse(fs.readFileSync("./jsonfiles/races.json", 'utf8'))

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`) // eslint-disable-line no-console

    let stembed = new Discord.RichEmbed()
        .setAuthor("Game Master", "https://cdn.iconscout.com/icon/premium/png-256-thumb/wizard-23-483776.png")
        .setColor("#808080")
        .setDescription(`
        — To start your new adventure I'll need your card number...\n
        — *Haha! Just kidding, this doesn't exist here... ...cofcof (yet)\n
        — So...*\n\n
        ▼ **Let's create your new CHARACTER?? **▼\n
        `)
        .setFooter(`✅YES | ❎NO`)

    let rEmbed = new Discord.RichEmbed()
        .setTitle("1. CHOOSE YOUR CHARACTER'S RACE")
        .setColor("#00D0FF")
        .setThumbnail("https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Villager-512.png")
        .setDescription("► Every character belongs to a race.\n► The race you choose contributes to your character's identity in an important way by establishing a general appearance and the natural talents gained from culture and ancestry.")
        .setFooter("You'll have [um tanto aí] seconds to type your desired race.")

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
                        return message.reply("Come back later!")
                    case '✅':
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
                                    return message.channel.send(rEmbed)
                                } else {
                                    try {
                                        raceArray.push(res[0].name)
                                    } catch (err4) {
                                        return message.reply("ERRGAMCRE04 - Try again later or contact the dev.")
                                    }
                                    for (let i = 1; i < res.length; i++) raceArray.unshift(res[i].name)

                                    rEmbed.addField(`↙ Choose one`, `***${raceArray.join(' -')}***`, true)
                                    return message.channel.send(rEmbed)
                                }
                            })
                        break
                    default:
                        return message.channel.send("¯\\_(ツ)_/¯")
                }
            })
            .catch(collected => {
                console.log(collected)
                return message.channel.send("I couldn't do any!")
            })
    })
}

module.exports.config = {
    name: "create",
    aliases: ["new"]
}

//Simbols: alt+16 ► \ alt+17 ◄ \ alt+30 ▲ \ alt+31 ▼