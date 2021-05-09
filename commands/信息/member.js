const Discord = require('discord.js');
module.exports = {
    name: "member",
    category: '信息',
    usage: "member",
    description: "**伺服器成員状态**",
    run: async (bot, message, args) => {
        const guild = message.guild
        const embed = new Discord.MessageEmbed()
            .setTitle("伺服器成員")
            .addField(':fire:總成員:', `${guild.members.cache.filter(m => m.user.bot === false).size}`, true)
            .addField(':fire:總機器人:', `${guild.members.cache.filter(m => m.user.bot === true).size}`)
            .addField(':green_circle:在線人數:', `${guild.members.cache.filter(m => m.presence.status === 'online').size}`, true)
            .addField(':red_circle:離線人數:', `${guild.members.cache.filter(m => m.presence.status === 'offline').size}`, true)
            .addField(':crescent_moon:閒置人數:', `${guild.members.cache.filter(m => m.presence.status === 'idle').size}`, true)
            .setTimestamp()
            .setFooter(`©️${bot.user.username} by 秋辰`)
        message.channel.send(embed)
    }
}