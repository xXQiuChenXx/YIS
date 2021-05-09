const fetch = require("node-fetch")
const Discord = require('discord.js');
const recon = require('reconlx');
const ReactionPages = recon.ReactionPages
module.exports = {
    name: "lyrics",
    category: '信息',
    usage: "lyrics <歌名> [頁數] -[搜索引擎]",
    description: "查找歌詞",
    run: async (bot, message, args, config, headers) => {
        let song;
        let page = args[1]
        if (!args[0]) {
            return message.reply("請指定一個歌曲")
        }
        if (page) {
            if (isNaN(page)) {
                song = args.join(" ")
            } else {
                page = page - 1
                song = args[0]
            }
        } else {
            page = 0
            song = args.join(" ")
        }

        let engine = null
        if (song === args.join(" ")) {
            if (song.includes("-")) {
                engine = song.split("-")[1].split(" ")[0]
                song = song.replace(`-${engine}`, "")
            }
        }

        let url = `${config.api}lyrics?song=${encodeURI(song.trim())}`;
        if (engine) {
            url = `${config.api}lyrics?song=${encodeURI(song.trim())}&engine=${engine}&type=new`
        }

        let xinrui;
        try {
            xinrui = await fetch(url, { headers }).then(url => url.json());
        } catch (e) {
            return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
        }

        let lyric
        if (xinrui.engine === "mojim") {
            try {
                lyric = xinrui.lyrics[page].lyric.replaceAll("\n\n\n", "\n").replaceAll("\n\n", "\n")
            } catch (e) {
                return message.channel.send("無法找到該歌詞")
            }
        } else {
            lyric = xinrui.lyrics.replaceAll("\n\n\n", "\n").replaceAll("\n\n", "\n")
        }

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`**${song}** 的歌詞`)
            .setDescription(lyric.slice(0, -(lyric.length - 2048)))
        let pages = [embed]

        if (lyric.slice(2048, lyric.length)) {
            const embed2 = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`**${song}** 的歌詞`)
                .setDescription(lyric.slice(2048, 4096))
            pages.push(embed2)
        }

        if (lyric.slice(4096, lyric.length)) {
            const embed3 = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`**${song}** 的歌詞`)
                .setDescription(lyric.slice(4096, 6144))
            pages.push(embed3)
        }

        const textPageChange = true;
        const emojis = [
            "⏪",
            "⏩"
        ]
        const time = 30000
        ReactionPages(message, pages, textPageChange, emojis, time);
    }
}