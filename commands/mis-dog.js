const Discord = require("discord.js")
const superagent = require("superagent")

module.exports.run = async (message, cmd, args) => {
    await message.delete()
    console.log(`[${cmd.slice(1)}] requested by: [${message.author.tag}]`)

    let {
        body
    } = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)

    let dogembed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle("Good boy")
        .setImage(body.message)
        .setFooter("from Random.dog")
    message.channel.send(dogembed)
}

module.exports.config = {
    name: "doggo",
    aliases: ["dog"]
}