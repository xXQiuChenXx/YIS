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
    if (message.channel.id === config.WhitelistChannel) {
        //检测是否机器人
        if (message.author.bot) {
            return
        }
        //检测信息内容
        if (message.content.includes('MC ID') || message.content.includes('mc id') || message.content.includes('mcid') || message.content.includes('MCID')) {
            //检测是否格式正确
            if (!message.content.includes("\n")) {
                message.react("❓")
                return message.reply("格式錯誤...")
            }
            //检测屁孩复制粘贴发送并没填写
            let Original = message.content.split("\n")[0]
            if (Original === "MC ID ：") {
                return
            }
            //如果信息第一排没包含id
            if(!Original.toLowerCase().includes("id")) {
                message.react("❓")
                return message.reply("格式錯誤...")
            }
            //玩家ID
            let id = ""
            if(message.content.includes(':')) {
                id = message.content.split("\n")[0].split(":")[1]
            }
            if(message.content.includes('：')) {
                id = message.content.split("\n")[0].split("：")[1]
            }
            //message.content.split("\n")[0]
            //.replace("MC ID", "")
            //.replace("MCID", "")
            //.replace("mc id", "")
            //.replace("：", "")
            //.replace(":", "")
            //.trim()
            //确认信息
            const embed = new Discord.MessageEmbed()
            .setTitle(`你的ID是 **"${id}"**, 請確認`)
            .setDescription("請選擇一個選項:")
            .addField("1️⃣ Java/Mac/電腦版", "如果你是Java/Mac/電腦版，請選擇1️⃣")
            .addField("2️⃣ Pe/Be/Win10/手機版", "如果你是Pe/Be/Win10/手機版，請選擇2️⃣")
            .addField("❌ ID顯示錯誤", "如果顯示出的ID跟你的ID不對，請選擇❌")
            .setColor("RANDOM")
            const prompt = await message.lineReply(embed)
            //添加反应
            await prompt.react("1️⃣")
            await prompt.react("2️⃣")
            await prompt.react("❌")

            const collector = await prompt.createReactionCollector((r, usr) => usr === message.author, { time: 60000 })

            collector.on("collect", async (r) => {
                try {
                    await r.users.remove(message.author.id).catch(e => { throw e })
                } catch (e) { }
                switch (r.emoji.name) {
                    case "❌":
                        collector.stop()
                        break
                    case "1️⃣":
                        collector.stop()
                        Perm(id, message)
                        break
                    case "2️⃣":
                        let xinrui;
                        let url = config.api + "xuid?gamertag=" + id
                        try {
                            xinrui = await fetch(encodeURI(url), { headers }).then(url => url.json())
                            xinrui["uuid"]
                        } catch (e) {
                            return message.reply("API系統出錯了，請稍後再試或等管理員通過")
                        }
                        id = xinrui["uuid"]
                        Perm(id, message)
                        collector.stop()
                        break
                }
            })

            collector.on("end", async () => {
                prompt.delete()
            })

            async function Perm(id, message) {
                let command = config.command.replace("%player%", id)
                await message.channel.send(`:tada: ${message.author.toString()}, 你獲得了玩家稱號/身份組，记得来伺服器玩喔！`)
                await message.react("👍")
                await bot.channels.cache.get(config.WhitelistConsole).send(command)
                await message.channel.send("MC ID ：\nDC ：\n自介：(可留空\n*複製填寫此信息可自動获得了玩家稱號/身份组")
            }
        }
    }
}