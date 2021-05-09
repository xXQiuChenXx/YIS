const Discord = require("discord.js");
const version = require("discord.js").version
const fs = require("fs")
module.exports = {
    name: "bot",
    description: "查看機器人狀態!",
    usage: "bot",
    category: "信息",
    run: async (bot, message, args) => {
        let filez = 0
        fs.readdir("./commands/", (err, files) => {
            files.forEach(file => {
                let length = fs.readdirSync(`./commands/${file}`).length
                filez = filez + length
            });
            if (err) return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")

            let Embed = new Discord.MessageEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL())
                .setURL(bot.user.avatarURL())
                .setColor(0x00A2E8)
                .addField("製作人員", `冥宏#3035`, true)
                .addField("已用內存", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MBS", true)
                .addField("指令:", `${filez}`)
                .addField('服務器總數', Math.ceil(bot.guilds.cache.size), true)
                .addField('機器人建立', bot.user.createdAt.toLocaleString())
                .addField('资源', `discord.js ${version}`, true)
                .addField('Node.js版本', process.version, true)
                .addField('機器人版本', "7.3.0", true)
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL);
            message.channel.send(Embed)
        })
    }
}