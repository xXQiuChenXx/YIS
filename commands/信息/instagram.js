const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
module.exports = {
    name: "instagram",
    category: '信息',
    usage: "instagram <用戶名>",
    description: "獲取某用戶IG信息",
    run: async (bot, message, args, config, headers) => {
        const Search = args.join(" ")
        if (!Search) {
            return message.channel.send('你需要指定一個IG用戶名')
        }
        let xinrui;
        let url = `${config.api}instagram?username=${Search}`
        try {
            xinrui = await fetch(url, { headers }).then(url => url.json());
        } catch (e) {
            return message.reply("出错了，找不到該賬號... :(")
        }
        if (xinrui.status === "success") {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(xinrui.fullname)
                .setURL(`https://instagram.com/${Search}`)
                .setThumbnail(xinrui.picture)
                .addField("用户檔案信息:", stripIndents`**- 用戶名:** ${xinrui.username}
            **- 全名:** ${xinrui.fullname}
            **- 個性簽名:** ${xinrui.biography.length == 0 ? "沒有" : xinrui.biography}
            **- 帖子:** ${xinrui.posts}
            **- 粉丝:** ${xinrui.followers}
            **- 正在关注:** ${xinrui.following}
            **- 私人帐号:** ${xinrui.private ? "有 🔐" : "没有 🔓"}`);

            message.channel.send(embed);
        } else {
            message.channel.send(xinrui.error)
        }
    }
}
