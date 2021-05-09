const Discord = require('discord.js');
module.exports = {
    name: "suggest",
    description: "查看删除的信息!",
    usage: "suggest <建議>",
    category: "信息",
    run: async (bot, message, args) => {
        const suggest = args.join(" ")
        if (!suggest) {
            return message.channel.send("用法錯誤").then(msg => {
                msg.delete({ timeout: 10000 })
            })
        }
        message.delete()
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL())
            .setDescription("**提議**: " + suggest)
        let sent = await message.channel.send(embed)
        await sent.react("👍")
        await sent.react("👎")
    }
}