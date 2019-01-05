const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const chalk = require("chalk"); //https://www.npmjs.com/package/chalk
const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});
const dateFormat = require('dateformat'); //https://www.npmjs.com/package/dateformat

const mongoose = require("mongoose");
const CoinMod = require("./models/mod-coins.js");
const dbDefault = "mongodb://localhost:27017/UltimateData";

mongoose.connect(dbDefault, {
    useNewUrlParser: true
}).catch(err => console.log(chalk.redBright("[ERR] " + err)));;
mongoose.connection.on('connected', function () {
    console.log(chalk.cyan("[LOG] Connected to", dbDefault));
}).catch(err => console.log(chalk.redBright("[ERR] " + err)));;

require("./util/eventHandler")(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(chalk.redBright("[ERR] " + err));
    let jsfile = files.filter(filterJsExtension => filterJsExtension.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("[LOG] Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        var timel = dateFormat(new Date(), "l")
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
            .setColor("#808080")
            .setThumbnail("https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/config.png")
            .setDescription("Current prefix" + `\`\`\`css\n${prefix}\`\`\``);

        console.log(`[CMD] ${message} requested by ${message.author.username}`);
        message.channel.send(prembed);
    }
    if (message.content.startsWith(prefix)) {
        if (commandfile) commandfile.run(bot, message, args, cmd);
    } else {
        // ---- Coin System not related with the Role Playing
        let coinstoadd = Math.ceil(Math.random() * 20);

        CoinMod.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, coins) => {
            if (err) console.log(chalk.bgRedBright("[ERR] " + err));
            if (!coins) {
                const newCoins = new CoinMod({
                    userID: message.author.id,
                    userNm: message.author.tag,
                    serverID: message.guild.id,
                    coins: coinstoadd
                })
                newCoins.save().catch(err => console.log(chalk.redBright("[ERR] newCoins.save() > " + err)));
            } else {
                console.log("[---] Coins: " + coinstoadd);
                coins.coins = coins.coins + coinstoadd;
                coins.save().catch(err => console.log(chalk.redBright("[ERR] coins.save() > " + err)));
            }
        })
    }
    // ---- close.
})

bot.login(process.env.BOT_TOKEN);
