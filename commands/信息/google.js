const Discord = require('discord.js');
const fetch = require("node-fetch");
module.exports = {
  name: "google",
  category: '信息',
  usage: "google <信息>",
  description: "**Google 搜索**",
  run: async (bot, message, args, config, headers) => {

    const Search = args.join(" ")

    if (!Search) {
      return message.reply("請指定你要搜索的內容")
    }

    const url = `${config.api}google?search=${encodeURI(Search)}`;

    let xinrui;
    try {
      xinrui = await fetch(url, { headers }).then(url => url.json());
    } catch (e) {
      return message.channel.send("哎呀，出錯了..." + "\n" + "```" + e.message + "```")
    }
    let data = xinrui.map((XinRui) => {
      return `**[${XinRui.title}](${XinRui.url})**\n${XinRui.description}`
    }).join('\n\n')

    if (data.length > 2048) {
      data = data.slice(0, 2048)
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(`"**${Search}**" 的搜索結果`)
      .setURL(`https://google.com/search?q=${encodeURI(Search)}`)
      .setThumbnail("https://i.ibb.co/Ln1pxFb/image.png")
      .setDescription(data)
      .setFooter("© Powered by 芯瑞API")

    message.channel.send(embed)
  }
}