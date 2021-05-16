const { confirmation } = require("reconlx");
const Discord = require('discord.js');
module.exports = async (bot, message, config) => {
    if (message.channel.id === "835034616044716073") {
        if (message.author.bot) {
            if (message.content.includes('你還沒加白名單')) {
                let RE = message.content.split("name=")[0]
                let NAME = message.content.replace(RE, "").replace("name=", "").split(",")[0]
                return bot.channels.cache.get(config.BotChannel).send(`**[系統]** 哎呀，發現了一隻迷失的小羊"**${NAME}**"，他忘了加白名欸..`)
            }
        }
    }
    if (message.channel.id === config.WhitelistChannel) {
        let id
        let Platform
        if (message.author.bot) {
            return
        }

        if (message.content.includes('MC ID') || message.content.includes('mc id')) {
            if (!message.content.includes("\n")) {
                return message.react("❓")
            }
            let Original = message.content.split("\n")[0]
            if (Original === "MC ID ：(如是pe,be, win10請註明)") {
                return
            }
            let pe = message.content.includes('(pe)')
            let win10 = message.content.includes('(win10)')
            let be = message.content.includes('(be)')
            let PE = message.content.includes('(PE)')
            let WIN10 = message.content.includes('(WIN10)')
            let BE = message.content.includes('(BE)')
            if (pe || win10 || be || PE || WIN10 || BE) {
                let id2 = message.content.split("\n")[0].replace("MC ID", "").replace("mc id", "").replace("：", "").replace(":", "").replace(/ *\([^)]*\) */g, "").trim().replace(" ", "_")
                id = "." + id2
                Platform = "PE/BE/WIN10"
                await Whitelist(id, Platform, message)
            } else {
                id = message.content.split("\n")[0].replace("MC ID", "").replace("mc id", "").replace("：", "").replace(":", "").trim()
                Platform = "JAVA"
                Whitelist(id, Platform, message)
            }
        }
        async function Whitelist(id, Platform, message) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`**请確認**`)
                .setDescription(`${message.author.toString()}你的MC ID是${id}，並且是${Platform}玩家\n✅代表正確 ❌代表錯誤`)
            message.channel.send(embed).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ["✅", "❌"], 60000);
                if (emoji === "✅") {
                    let command = config.command.replace("%player%", id)
                    await msg.delete()
                    await message.channel.send(`:tada: ${message.author.toString()}, 你的白名单申请已通过，记得来伺服器玩喔！`)
                    await message.react("👍")
                    await bot.channels.cache.get(config.WhitelistConsole).send(command)
                    await message.channel.send("MC ID ：(如是pe,be, win10請括號註明)\nDC ：\n自介：(可留空\n*複製填寫此信息可自動白名")
                }
                if (emoji === "❌") {
                    msg.delete()
                }
            });
        }
    }
}
