const Discord = require("discord.js")
const superagent = require("superagent")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let {
        body
    } = await superagent
        .get(`https://aws.random.cat/meow`)

    let embed = new Discord.RichEmbed()
        .setColor("#ff99ff")
        .setTitle("Human enemy")
        .setImage(body.file)
        .setFooter("from Random.cat")

    message.channel.send(embed)
}

module.exports.config = {
    name: "cat",
    aliases: []
}