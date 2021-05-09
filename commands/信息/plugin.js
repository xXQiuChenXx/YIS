const fetch = require("node-fetch")
const recon = require("reconlx")
const Discord = require('discord.js');
const ReactionPages = recon.ReactionPages;
module.exports = {
    name: "plugin",
    category: '信息',
    usage: "plugin <spigot/bukkit> <名字>",
    description: "搜索插件",
    run: async (bot, message, args, config, headers) => {
        const copyright = "[Spiget](https://spiget.org/)"
        const copyright2 = "[ServerMod API](https://bukkit.gamepedia.com/ServerMods_API)"
        const copyright3 = "[XinRui API](https://api.xinrui.tk/)"
        const Website = args[0]
        const Search = args[1]
        if (!Website || !Search) {
            return message.reply("用法錯誤，正確用法：&plugin <bukkit/spigot> <插件名>")
        }
        if (Website === "bukkit") {
            let url = `${config.api}bukkit?search=${Search}`
            let xinrui;
            try {
                xinrui = await fetch(encodeURI(url), { headers }).then(url => url.json());
            } catch (e) {
                return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
            }

            try {
                xinrui = xinrui.slice(0, 20)
            } catch (e) {
                return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
            }

            let Data = xinrui.map((name, i) => {
                return `**${i + 1}.** ${name.name}`
            }).join('\n')

            const embed = new Discord.MessageEmbed()
                .setTitle(`"**${Search}**" 的搜索結果`)
                .setAuthor(`1到${xinrui.length}請輸入你想要的插件資料`, bot.user.avatarURL())
                .setDescription(Data)
                .addField(`© Powered by`, copyright2, true)
                .addField(`© Powered by`, copyright3, true)

            message.channel.send(embed).then(m => {
                message.channel
                    .awaitMessages(
                        me =>
                            me.author.id === message.author.id &&
                            parseInt(me) > 0 &&
                            parseInt(me) < xinrui.length,
                        { max: 1, time: 30000, errors: ['time'] }
                    )
                    .then(async collected => {
                        url = `${config.api}bukkit?search=${xinrui[parseInt(collected.first().content) - 1].id}`
                        try {
                            xinrui = await fetch(encodeURI(url), { headers }).then(url => url.json());
                        } catch (e) {
                            return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
                        }

                        let Data = xinrui.map((xin, i) => {
                            return `**${i + 1}.** [${xin.gameVersion} - ${xin.fileName}](${xin.downloadUrl})`
                        }).join('\n')

                        if (Data.length > 2048) {
                            let Split = Data.split("\n")
                            let data1 = Split.slice(0, Math.floor(Split.length/5)).join("\n")
                            let data2 = Split.slice(Math.floor(Split.length/5), Math.floor(Split.length/5*2)).join("\n")
                            let data3 = Split.slice(Math.floor(Split.length/5*2), Math.floor(Split.length/5*3)).join("\n")
                            let data4 = Split.slice(Math.floor(Split.length/5*3), Math.floor(Split.length/5*4)).join("\n")
                            let data5 = Split.slice(Math.floor(Split.length/5*4), Split.length).join("\n")
                            const embed1 = new Discord.MessageEmbed()
                                .setTitle('點擊以下任意鏈接下載文件')
                                .setDescription("[頁數] [版本] [文件名]\n" + data1)
                            const embed2 = new Discord.MessageEmbed()
                                .setTitle('點擊以下任意鏈接下載文件')
                                .setDescription("[頁數] [版本] [文件名]\n" + data2)
                            const embed3 = new Discord.MessageEmbed()
                                .setTitle('點擊以下任意鏈接下載文件')
                                .setDescription("[頁數] [版本] [文件名]\n" + data3)
                            const embed4 = new Discord.MessageEmbed()
                                .setTitle('點擊以下任意鏈接下載文件')
                                .setDescription("[頁數] [版本] [文件名]\n" + data4)
                            const embed5 = new Discord.MessageEmbed()
                                .setTitle('點擊以下任意鏈接下載文件')
                                .setDescription("[頁數] [版本] [文件名]\n" + data5)

                            const pages = [embed1, embed2, embed3, embed4, embed5];
                            const textPageChange = true;
                            const emojis = ["⏪", "⏩"];
                            const time = 60000;
                            return ReactionPages(message, pages, textPageChange, emojis, time);
                        }

                        message.channel.send(
                            new Discord.MessageEmbed()
                                .setTitle('點擊以下任意鏈接下載文件')
                                .setDescription("[頁數] [版本] [文件名]\n" + Data)
                                .addField(`© Powered by`, copyright2, true)
                                .addField(`© Powered by`, copyright3, true)
                        )
                    })
                    .catch(() => {
                        m.edit(
                            new Discord.MessageEmbed()
                                .setTitle('已失效')
                        )
                    })
            })
        }
        if (Website === "spigot") {
            let Search = args.slice(1, args.length).join(" ")
            let url = `${config.api}spigot?name=${encodeURI(Search)}`
            let xinrui;
            try {
                xinrui = await fetch(url, { headers }).then(url => url.json())
            } catch (e) {
                return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
            }

            xinrui = xinrui.slice(0, 20)
            let Data = xinrui.map((xin, i) => {
                return `**${i + 1}.** [${xin.name}](${xin.link})`
            }).join('\n')

            const Embed = new Discord.MessageEmbed()
                .setAuthor(`1到${xinrui.length}請輸入你想要的插件資料`, bot.user.avatarURL())
                .setTitle(`"**${Search}**" 的搜索結果`)
                .setDescription(Data)
                .setColor("RANDOM")
            return message.channel.send(Embed).then(m => {
                message.channel
                    .awaitMessages(
                        me =>
                            me.author.id === message.author.id &&
                            parseInt(me) > 0 &&
                            parseInt(me) < xinrui.length,
                        { max: 1, time: 30000, errors: ['time'] }
                    )
                    .then(async collected => {
                        url = `${config.api}spigot?name=${xinrui[parseInt(collected.first().content) - 1].id}`
                        try {
                            xinrui = await fetch(encodeURI(url), { headers }).then(url => url.json());
                        } catch (e) {
                            return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
                        }
                        if (xinrui.status === "failed") {
                            return message.channel.send("查無資料")
                        }

                        const embed = new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setThumbnail(xinrui.icon)
                            .setTitle(xinrui.name)
                            .setURL(xinrui.link)
                            .setAuthor(xinrui.author.name, xinrui.author.icon)
                            .setDescription(xinrui.tag)
                            .addField('插件id', xinrui.id, true)
                            .addField('版本', xinrui.version, true)
                            .addField('上次更新時間', xinrui.update, true)
                            .addField('支持版本', xinrui.testedVersions, true)
                            .addField('支持語言', xinrui.language, true)
                            .addField(':money_with_wings:付費', xinrui.premium, true)
                            .addField('價格', xinrui.price, true)
                            .addField('贊數', xinrui.likes, true)
                            .addField('下載量', xinrui.downloads, true)
                            .addField('文件大小', xinrui.size, true)
                            .addField('文件格式', xinrui.filetype, true)
                            .addField('下載鏈接', `[点击这里](${xinrui.download})`, true)
                            .addField('總評論', xinrui.rating)
                            .setFooter(`©️机器人by秋辰`)
                            .addField(`© Powered by`, copyright, true)
                            .addField(`© Powered by`, copyright3, true)
                        return message.channel.send(embed)
                    })
                    .catch(() => {
                        m.edit(
                            new Discord.MessageEmbed()
                                .setTitle('已失效')
                        )
                    })
            })
        }
    }
}