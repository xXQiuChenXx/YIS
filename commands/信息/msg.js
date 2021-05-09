const Discord = require('discord.js');
module.exports = {
    name: "msg",
    category: '信息',
    usage: "msg <用户> <信息>",
    description: "**发送私聊**",
    run:async (bot, message ,args) => {
        const user = message.mentions.members.first()    

        if(!user) {
            return message.channel.send("请指定一个用户")
        }

        if(!args[1]) {
            return message.reply(`请提供一个你要发送的信息`)
        }

            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('你收到了一封私信💬')
            .setDescription(args[1])
            .setFooter(`此信息来至 ${message.member.user.tag}`)

            message.delete()
            try {
                await user.send(embed)
            } catch(e) {
                return message.channel.send(e.message)
            }

            const embed2 = new Discord.MessageEmbed()
            .setTitle(`私信发送`)
            .setDescription(`信息成功发送给 ${bot.users.cache.get(user.id).tag}`)
            
            message.channel.send(embed2).then(msg => {
                msg.delete({ timeout: 10000 })
            })
    }
}
