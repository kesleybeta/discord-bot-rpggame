const Discord = require("discord.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let adembed = new Discord.RichEmbed()
        .setTitle("Player: " + `**${message.author.username}**`)
        .setColor("#010101")

    switch (args.toString()) {
        case "1":
            message.reply("you chose the Adventure #1")
            adembed.setDescription("It's almost dawn, you're in a tavern drinking alone after a long day of jobs done...")
            break

        case '2':
            message.reply("Adventure 2")
            break

        default:
            return
    }
    message.channel.send(adembed)
}

module.exports.config = {
    name: "adventure",
    aliases: ["a", "adv"]
}