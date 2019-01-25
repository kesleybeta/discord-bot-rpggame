const botconfig = require("./botconfig.json")
const Discord = require("discord.js")
const fs = require("fs")
//const tools = require("../util/functions")
const bot = new Discord.Client({
    disableEveryone: true
})
const dateFormat = require('dateformat') //https://www.npmjs.com/package/dateformat
var timel = dateFormat(new Date(), "hh:MM:ss:L")

const mongoose = require("mongoose")
const CoinMod = require("./models/mod-coins.js")
const dbDefault = process.env.MONGO_URI

mongoose.connect(dbDefault, {
    useNewUrlParser: true
}).catch(err => console.log("ERRAPPIND01 " + err))

mongoose.connection.on('connected', function () {
    console.log(`[${timel}] Connected to /ultimatedata`)
}).catch(err => console.log("ERRAPPIND02 " + err))

require("./util/eventHandler")(bot)

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
    if (err) console.log("ERRAPPIND03 " + err)
    let jsfile = files.filter(filterJsExtension => filterJsExtension.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("[LOG] Couldn't find commands.")
        return
    }
    jsfile.forEach(f => {
        try {
            let commandFile = require(`./commands/${f}`)
            //console.log(`[${timel}] Command loaded: ${f.toUpperCase().split(".JS")}`)
            bot.commands.set(commandFile.config.name, commandFile)
            commandFile.config.aliases.forEach(alias => {
                bot.aliases.set(alias, commandFile.config.name)
            })
        } catch (e) {
            return console.log(`[${timel}] Command not loaded: ${f.toUpperCase().split(".JS")} ` + e)
        }
    })
})

bot.on("message", async message => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        }
    }

    let prefix = prefixes[message.guild.id].prefixes
    let messageArray = message.content.toLowerCase().split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))

    if (cmd === `prefix`) {
        await message.delete()
        let prembed = new Discord.RichEmbed()
            .setColor("#808080")
            .setTitle("Current prefix")
            .setThumbnail("https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/config.png")
            .setDescription(`\`\`\`json\n${prefix}\`\`\``)

        console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)
        message.channel.send(prembed)
    }
    if (message.content.toLowerCase().startsWith(prefix)) {
        if (commandfile) commandfile.run(message, cmd, args)
    } else {
        // ---- Coin System not related with the Role Playing
        let coinstoadd = Math.ceil(Math.random() * 20)

        CoinMod.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, coinsSystem) => {
            if (err) console.log("ERRAPPIND04 " + err)
            if (!coinsSystem) {
                const newDocCoins = new CoinMod({
                    userID: message.author.id,
                    userNm: message.author.tag,
                    serverID: message.guild.id,
                    coins: coinstoadd
                })
                newDocCoins.save().catch(err => console.log("ERRAPPIND05 " + err))
            } else {
                coinsSystem.coins = coinsSystem.coins + coinstoadd
                coinsSystem.save().catch(err => console.log("ERRAPPIND06 " + err))
            }
        })
    }
    // ---- close.
})

bot.login(process.env.BOT_TOKEN)