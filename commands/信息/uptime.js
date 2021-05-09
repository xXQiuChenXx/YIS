const Discord = require('discord.js');
module.exports = {
    name: "uptime",
    category: '信息',
    usage: "uptime",
    description: "機器人總運行時間",
    run: async (bot, message, args) => {
        let days = 0;
        let week = 0;
        let uptime = ``;
        let totalSeconds = (bot.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        if (hours > 23) {
            days = days + 1;
            hours = 0;
        }
        if (days == 7) {
            days = 0;
            week = week + 1;
        }
        if (week > 0) {
            uptime += `${week} week, `;
        }
        if (minutes > 60) {
            minutes = 0;
        }

        uptime += `${days} 天, ${hours} 小时, ${minutes} 分钟 ${seconds} 秒`;

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField('總運行時間', uptime);

        message.channel.send(embed);
    }

}
