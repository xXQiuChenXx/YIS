const Discord = require('discord.js')
module.exports = {
    name: "ping",
    category: '信息',
    usage: "ping",
    description: "延遲和API 延遲",
    run: async (bot, message, args) => {
        message.channel.send(`🏓 Pinging....`).then(msg => {
            const _ = new Discord.MessageEmbed()
                .setTitle('Pong!')
                .setDescription(`🏓 Pong!\n延遲為 ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI延遲為 ${Math.round(bot.ws.ping)}ms`)
                .setColor('RANDOM')
            msg.edit(_);
            msg.edit("\u200B")
        })
    }
}