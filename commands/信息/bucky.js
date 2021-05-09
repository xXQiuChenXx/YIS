const Discord = require("discord.js");
const fetch = require("node-fetch")
const recon = require("reconlx");
const ReactionPages = recon.ReactionPages;
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "bucky",
    description: "bucky雜貨店商品",
    usage: "bucky <種類>",
    category: "信息",
    run: async (bot, message, args, config, headers) => {
        let type = args[0];
        let url;
        let xinrui;
        if(!type) {
            url = `${config.api}bucky`
            try {
                xinrui = await fetch(url, { headers }).then(url => url.json());
            } catch (e) {
                return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
            }
            let types = Object.keys(xinrui)
            const embed = new Discord.MessageEmbed()
                .setTitle("**Bucky商品種類**")
                .setDescription(`種類: ${types.join(" ")}\n注意: 這個指令可能會因為bucky網站更新而無法獲取信息`)
                .setColor("RANDOM")
            return message.channel.send(embed)
        }
        url = `${config.api}bucky`
        try {
            xinrui = await fetch(url, { headers }).then(url => url.json());
        } catch (e) {
            return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
        }
        let full;
        try {
            full = xinrui[type]
        } catch (e) {
            return message.channel.send("查無資料")
        }

        let Name = Object.keys(full)
        let data = Name.map((bucky, i) => {
            return `**${i + 1}.** ${bucky}`
          }).join('\n')

        const embed = new Discord.MessageEmbed()
            .setAuthor(`1到${Name.length}請輸入你想要的商品資料`, bot.user.avatarURL())
            .setTitle("**" + type + "**")
            .setDescription(data)
            .setColor("RANDOM")
        message.channel.send(embed)
        .then(m => {
            message.channel
                .awaitMessages(
                    me =>
                        me.author.id === message.author.id &&
                        parseInt(me) > 0 &&
                        parseInt(me) < Name.length + 1,
                    { max: 1, time: 30000, errors: ['time'] }
                ).then(async collected => {
                    url = `${config.api}bucky?type=${type}&name=${Name[parseInt(collected.first().content) - 1]}`
                    let res;
                    try {
                        res = await fetch(encodeURI(url), { headers }).then(url => url.json());
                    } catch (e) {
                        return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
                    }
                    data = ""
                    for (const temp of res) {
                        data = `${data}**商品**: ${temp.name}\n**價格**: ${temp.price}\n**其他**:\n` + "```" + temp.datas + "```" + "\n=="
                    }

                    if(data.length < 2000) {
                        data = data.replaceAll("==", "")
                        const embed = new Discord.MessageEmbed()
                        .setTitle("**搜索結果**")
                        .setDescription(data)
                        .setColor("RANDOM")
                        return message.channel.send(embed)
                    }
                    let pages = []
                    let result = data.split("==")
                    if (data.length > 2000 && data.length < 4000) {
                        let t = result.length/2
                        let tem = ""
                        let tem2 = ""
                        for (let i = 0; i < Math.floor(t); i++) {
                            tem = tem + result[i]
                        }
                        for (let i = Math.floor(t); i < result.length; i++) {
                            tem2 = tem2 + result[i]
                        }
                        const embed1 = new MessageEmbed()
                        .setTitle("**搜索結果**")
                        .setDescription(tem)
                        const embed2 = new MessageEmbed()
                        .setTitle("**搜索結果**")
                        .setDescription(tem2)
                        pages = [ embed1, embed2 ]
                    }
                    if (data.length > 4000) {
                        let t = result.length/3
                        let tem = ""
                        let tem2 = ""
                        let tem3 = ""
                        for (let i = 0; i < Math.floor(t); i++) {
                            tem = tem + result[i]
                        }
                        for (let i = Math.floor(t); i < Math.floor(t*2); i++) {
                            tem2 = tem2 + result[i]
                        }
                        for (let i = Math.floor(t*2); i < result.length; i++) {
                            tem3 = tem3 + result[i]
                        }
                        const embed1 = new MessageEmbed()
                        .setTitle("**搜索結果**")
                        .setDescription(tem)
                        const embed2 = new MessageEmbed()
                        .setTitle("**搜索結果**")
                        .setDescription(tem2)
                        const embed3 = new MessageEmbed()
                        .setTitle("**搜索結果**")
                        .setDescription(tem2)
                        pages = [ embed1, embed2, embed3 ]
                    }

                    const textPageChange = true;
                    const emojis = ["⏪", "⏩"];
                    const time = 30000;
                    ReactionPages(message, pages, textPageChange, emojis, time);
                })
        })
    }
}