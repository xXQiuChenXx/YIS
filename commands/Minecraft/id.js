const Discord = require('discord.js');
const fetch = require("node-fetch");
module.exports = {
    name: "id",
    category: 'Minecraft',
    usage: "id <MC id>",
    description: "檢查Minecraft ID",
    run: async (bot, message, args, config, headers) => {
        const copyright = "[Mojang API](https://minecraft.fandom.com/zh/wiki/Mojang_API)"
        const copyright2 = "[XinRui API](https://api.xinrui.tk/)"
        if(!args[0]) {
            return message.reply("缺少Minecraft ID")
        }
        
        let xinrui;
        let url = `${config.api}mc?name=${args[0]}`
        try {
            xinrui = await fetch(encodeURI(url), { headers }).then(url => url.json());
        } catch(e) {
            return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
        }

        if(xinrui.status === "failed") {
            return message.channel.send("出錯了或者是盜版賬號...")
        }

        let history
        if(xinrui.history === "none") {
            history = "無"
        } else {
            history = xinrui["history"].map((XinRui, i) => {
                return `${i + 1}. ${XinRui.name}\n更改日期: ${XinRui.changedToAt}`
            }).join('\n')
            history = "\n```" + history + "```"
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`"${args[0]}" 的搜索結果`)
        .setDescription(`**ID:** ${xinrui.name}\n**UUID:** ${xinrui.id}\n**歷史ID:** ${history}`)
        .setColor("RANDOM")
        .addField(`© Powered by`, copyright, true)
        .addField(`© Powered by`, copyright2, true)
        message.channel.send(embed)
    }
}