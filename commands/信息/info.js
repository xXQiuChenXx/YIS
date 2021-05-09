const { MessageEmbed } = require('discord.js')
const { formatDate } = require('../../functions')
module.exports = {
    name: "info",
    description: "查看個人資料或者其他用戶的資料",
    usage: "info [用户]",
    category: "信息",
    run: async (bot, message, args) => {
        let Embed = new MessageEmbed()
        let roles = []
        if (!message.mentions.users.first()) {
            message.member.roles.cache.forEach(role => {
                roles.push(role.name)
            })
            Embed.setTitle(`你的個人資料!`)
            Embed.setThumbnail(message.author.displayAvatarURL())
            Embed.setColor(`RANDOM`)
            Embed.setDescription(`**名称**: ${message.member.user}\n**加入時間**(日/月/年): ${formatDate(message.member.joinedAt)}\n**ID**: ${message.author.id}\n**身份組**: ${roles.join(", ")}`)
            return message.channel.send(Embed)
        } else {
            let User = message.mentions.members.first()
            User.roles.cache.forEach(role => {
                roles.push(role.name)
            })
            Embed.setTitle(`${bot.users.cache.get(User.id).tag}的個人資料!`)
            Embed.setThumbnail(bot.users.cache.get(User.id).displayAvatarURL())
            Embed.setColor(`RANDOM`)
            Embed.setDescription(`**名称**: ${User}\n**加入時間**(日/月/年):  ${formatDate(User.joinedAt)}\n**ID**: ${User.id}\n**身份組**: ${roles.join(", ")}`)
            return message.channel.send(Embed)
        }
    }
}
