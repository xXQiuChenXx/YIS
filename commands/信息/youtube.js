const fetch = require("node-superfetch");
const Discord = require("discord.js");

module.exports = {
    name: "youtube",
    category: '信息',
    usage: "youtube <頻道名字>",
    description: "查看youtube频道资料",
    run: async (bot, message, args) => {
        let name = args.join(" ");
        let google = process.env.youtube
        if (!name) return message.channel.send("未知頻道錯誤.");
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${google}&maxResults=1&type=channel`

        const channel = await fetch.get(encodeURI(url))
            .catch(() => message.channel.send("未知頻道錯誤."));

        if (!channel.body.items[0]) return message.channel.send("沒有頻道搜索結果");

        const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${google}`)
            .catch(() => message.channel.send("未知頻道信息錯誤."));

        const embed = new Discord.MessageEmbed()
            .setColor(0x7289DA)
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setTimestamp(new Date())
            .addField("頻道名字", channel.body.items[0].snippet.channelTitle, true)
            .addField("頻道說明", channel.body.items[0].snippet.description, true)
            .addField("訂閱人數", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField("總觀看數", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
            .addField("影片總數(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
            .addField("創建日期", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
            .addField("鏈接", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
            .setFooter("機器人by秋辰")
        return message.channel.send(embed);
    }
}