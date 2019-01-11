const Discord = require("discord.js")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    if (!args.toString()) return message.reply("Give me a question to answer.")
    else {
        const replies = ["It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ]
        let replytext = Math.floor((Math.random() * replies.length) + 0)
        return message.channel.send("❔ — " + args.join(" ") + "\n🤔 — [...]\n❕ — "+replies[replytext])
    }
}

module.exports.config = {
    name: "8ball",
    aliases: ["8b"]
}