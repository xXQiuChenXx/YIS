const weather = require('weather-js');
const discord = require('discord.js')

module.exports = {
  name: "weather",
  description: "查看各地天氣",
  category: "信息",
  usage: "weather <地區>",
  run: (bot, message, args) => {
    if (!args.length) {
      return message.channel.send("請給一個位置")
    }

    weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
      try {
        let embed = new discord.MessageEmbed()
          .setTitle(`天氣 - ${result[0].location.name}`)
          .setColor("#ff2050")
          .setDescription("溫度單位可能會有所不同")
          .addField("溫度", `${result[0].current.temperature} 攝氏度`, true)
          .addField("天空文字", result[0].current.skytext, true)
          .addField("濕度", result[0].current.humidity, true)
          .addField("風速", result[0].current.windspeed, true)
          .addField("觀察時間", result[0].current.observationtime, true)
          .addField("風顯示", result[0].current.winddisplay, true)
          .setThumbnail(result[0].current.imageUrl);
        message.channel.send(embed)
      } catch (err) {
        return message.channel.send("无法获取给定位置的数据")
      }
    });
  }
}
