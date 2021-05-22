const Discord = require("discord.js");
const CronJob = require('cron').CronJob;
const version = require("discord.js").version
const util = require('minecraft-server-util');
const { tcpPingPort } = require("tcp-ping-port")
const { stripIndents } = require("common-tags");
const config = require("../../config.json")

module.exports = async (bot) => {
    const job = new CronJob('* * * * *', async function () {
        console.log("cron jobs")
        let days = 0;
        let week = 0;
        let uptime = ``;
        let totalSeconds = (bot.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);

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
        uptime += `${minutes} 分钟, ${hours} 小时, ${days} 天`;


        const channel = bot.channels.cache.get(config.BotChannel);
        const Pinned = await channel.messages.fetchPinned();
        const Message = await channel.messages.fetch(Pinned.first().id);
        const guild = bot.guilds.cache.get("653950651323383808")
        let Error = []
        let Errors = ""
        let online;
        let server = await util.status('mc.builderintw.net')
        .catch((error) => {
            Error.push(error.message)
        });

        if (server) {
            online = "[:green_circle:在線](https://mc.builderintw.net/)"
        } else {
            online = ":red_circle:已關閉"
            server = "0"
        }

        let online2 = 0
        let PE = await util.statusBedrock('be.builderintw.net', { port: 19132, enableSRV: true, timeout: 5000 })
            .catch((error) => {
                Error.push(error.message)
        });

        if (PE) {
            online2 = "[:green_circle:在線](https://mc.builderintw.net/)"
        } else {
            Error.push("PE SERVER IS DOWN")
            PE = "0"
            online2 = ":red_circle:已關閉"
        }

        let BlueMap;
        let bluemap = await tcpPingPort("map.builderintw.net", 8123)
        if (bluemap.online) {
            BlueMap = "[:green_circle:BlueMap](http://map.builderintw.net:8123/)"
        } else {
            Error.push("BLUEMAP IS DOWN")
            BlueMap = "[:red_circle:BlueMap](http://map.builderintw.net:8123/)"
        }

        let XinRui;
        let xinrui = await tcpPingPort("map.builderintw.net", 80)
        if(xinrui.online) {
            XinRui = "[:green_circle:芯瑞API](http://api.xinrui.tk/)"
        } else {
            Error.push("XINRUI API IS DOWN")
            XinRui = "[:red_circle:BlueMap](http://api.xinrui.tk/)"
        }

        if(Error.length) {
            for(const temp of Error) {
                Errors = Errors + temp + "&&"
            }
        } else {
            Errors = "狀態良好"
        }

        let Member = await guild.members.cache.filter(m => m.user.bot === false)
        let Bot = await guild.members.cache.filter(m => m.user.bot === true)
        let ONLINE = await guild.members.cache.filter(m => m.presence.status === 'online')
        let Data = "[點擊這裡](https://uptime.xinrui.tk/)"

        let Embed = new Discord.MessageEmbed()
            .setAuthor(bot.user.username + " 實況主(X")
            .setColor('RANDOM')
            .setDescription(stripIndents`**製作人員:** 冥宏#3035
                        **已用內存:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBS
                        **正常運行時間:** ${uptime}\n**機器人建立:** ${bot.user.createdAt.toLocaleString()}
                        **機器人版本:** v7
                        **Node.js版本:** ${process.version}
                        **資源:** discord.js ${version}
                        **延遲:** ${Math.round(bot.ws.ping)}ms
                        **報錯:** ${Errors}`)
            .addField('================================', "**伺服器成員:**")
            .addField(':fire:總成員:', `${Member.size}`, true)
            .addField(':fire:總機器人:', `${Bot.size}`, true)
            .addField(':green_circle:在線人數:', `${ONLINE.size}`, true)
            .addField(':red_circle:離線人數:', `${guild.members.cache.filter(m => m.presence.status === 'offline').size}`, true)
            .addField(':crescent_moon:閒置人數:', `${guild.members.cache.filter(m => m.presence.status === 'idle').size}`, true)
            .addField(':no_entry:勿擾模式人數:', `${guild.members.cache.filter(m => m.presence.status === 'dnd').size}`, true)
            .addField('================================', "**設備狀態:**")
            .addField('機器人', `:green_circle:在線`)
            .addField('伺服器(JAVA)', `${online}`, true)
            .addField('版本', `${server.version}`, true)
            .addField('人數 (在線/最大人數)', `${server.onlinePlayers}/${server.maxPlayers}`, true)
            .addField('伺服器(PE)', `${online2}`, true)
            .addField('版本', `${PE.version}`, true)
            .addField('人數 (在線/最大人數)', `${PE.onlinePlayers}/${PE.maxPlayers}`, true)
            .addField('線上地圖', `${BlueMap}`, true)
            .addField('芯瑞API', `${XinRui}`, true)
            .addField('更多Uptime', `${Data}`, true)
            .addField('================================', "**<a:loading:793054809699123271>  每分鐘更新**")
            .setTimestamp()
            .setFooter("©️机器人by秋辰", bot.user.displayAvatarURL());
        Message.edit(Embed);

        console.log('Uptime', uptime);

    }, null, true, 'Asia/Kuala_Lumpur');
    job.start();
}
