const { confirmation } = require("reconlx");
const Discord = require('discord.js');
const fetch = require("node-fetch")
module.exports = async (bot, message, config) => {
    //API请求头
    const headers = {
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36",
        "token": process.env.api
    };
    /*if (message.channel.id === "835034616044716073") {
        if (message.author.bot) {
            if (message.content.includes('你還沒加白名單')) {
                let RE = message.content.split("name=")[0]
                let NAME = message.content.replace(RE, "").replace("name=", "").split(",")[0]
                return bot.channels.cache.get(config.BotChannel).send(`**[系統]** 哎呀，發現了一隻迷失的小羊"**${NAME}**"，他忘了加白名欸..`)
            }
        }
    }*/
    if (message.channel.id === config.WhitelistChannel) {
        //如果是机器人退出
        if (message.author.bot) {
            return
        }
        //如果信息包含MC ID, mc id或是mcid
        if (message.content.includes('MC ID') || message.content.includes('mc id') || message.content.includes('mcid')) {
            //如果信息只有一行
            if (!message.content.includes("\n")) {
                return message.react("❓")
            }
            //检查复制了但没填写的人
            let Original = message.content.split("\n")[0]
            if (Original === "MC ID ：") {
                return
            }
            //检查没跟格式的人
            if (!Original.toLowerCase().includes("id")) {
                return message.react("❓")
            }
            //获取信息中的MC ID - 把前面的"MC ID："去掉
            let id = message.content.split("\n")[0].replace("MC ID", "").replace("mc id", "").replace("：", "").replace(":", "").trim()
            //执行
            const embed = new Discord.MessageEmbed()
                .setTitle(`**请確認**`)
                .setDescription(`${message.author.toString()}你的MC ID是${id}\n1️⃣代表Java或電腦版玩家 2️⃣代表Pe,Be,Win10或是手機版 ❌代表ID錯誤`)
            message.channel.send(embed).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ["1️⃣", "❌"], 60000);
                if (emoji === "1️⃣") {
                    let command = config.command.replace("%player%", id)
                    await msg.delete()
                    await message.channel.send(`:tada: ${message.author.toString()}, 你獲得了玩家稱號/身份組，记得来伺服器玩喔！`)
                    await message.react("👍")
                    await bot.channels.cache.get(config.WhitelistConsole).send(command)
                    await message.channel.send("MC ID ：\nDC ：\n自介：(可留空\n*複製填寫此信息可自動获得了玩家稱號/身份组")
                }
                if (emoji === "2️⃣") {
                    let xinrui;
                    let url = config.api + "xuid?gamertag=" + id
                    try {
                        xinrui = await fetch(encodeURI(url), { headers }).then(url => url.json())
                        xinrui["uuid"]
                    } catch (e) {
                        return message.reply("API系統出錯了，請稍後再試或等管理員通過")
                    }
                    id = xinrui["uuid"]
                    let command = config.command.replace("%player%", id)
                    await msg.delete()
                    await message.channel.send(`:tada: ${message.author.toString()}, 你獲得了玩家稱號/身份組，记得来伺服器玩喔！`)
                    await message.react("👍")
                    await bot.channels.cache.get(config.WhitelistConsole).send(command)
                    await message.channel.send("MC ID ：\nDC ：\n自介：(可留空\n*複製填寫此信息可自動获得了玩家稱號/身份组")
                }
                if (emoji === "❌") {
                    msg.delete()
                }
            })
        }
    }
}
