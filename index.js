const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});
const mongoose = require("mongoose");
const CoinMod = require("./models/mod-coins.js");

mongoose.connect("mongodb://localhost:27017/Coins", {
    useNewUrlParser: true
})

require("./util/eventHandler")(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log("[ERR]" + err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("[LOG] Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        var timel = new Date().toISOString().replace('T', ' ').replace('Z', '');
        let commandFile = require(`./commands/${f}`);
        console.log(`[${timel}] Command file loaded: ${f}`);
        bot.commands.set(commandFile.config.name, commandFile);
        commandFile.config.aliases.forEach(alias => {
            bot.aliases.set(alias, commandFile.config.name)
        })
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));

    if (cmd === `prefix`) {
        let prembed = new Discord.RichEmbed()
            .setColor("#ccefcb")
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setThumbnail("https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/config.png")
            .addField("Current prefix", `\`${prefix}\``);

        console.log(`[CMD] ${message} requested by ${message.author.username}`);
        message.channel.send(prembed);
    }
    console.log("test ----" +prefix.toUpperCase());
    if (message.content.startsWith(prefix)) {
        if (commandfile) commandfile.run(bot, message, args, cmd);
    } else {
        // ---- Coin System not related with the Role Playing
        let coinstoadd = Math.ceil(Math.random() * 50);
        console.log("[---] " + coinstoadd + " coins");
        CoinMod.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, coins) => {
            if (err) console.log("[ERR]" + err);
            if (!coins) {
                const newCoins = new CoinMod({
                    userID: message.author.id,
                    userNm: message.author.tag,
                    serverID: message.guild.id,
                    coins: coinstoadd
                })
                newCoins.save().catch(err => console.log("[ERR]" + err));
            } else {
                coins.coins = coins.coins + coinstoadd;
                coins.save().catch(err => console.log("[ERR]" + err));
            }
        })
    }
    // ---- close.
})

bot.login(tokenfile.token);