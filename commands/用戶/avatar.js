const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "avatar",
  description: "獲取某人的頭像",
  usage: "avatar [成員]",
  category: "用戶",
  run: async (bot, message, args) => {
    let Embed = new MessageEmbed();
    let roles = [];
    if (!message.mentions.users.first()) {
      message.member.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`你的頭像!`);
      Embed.setImage(message.author.displayAvatarURL());
      Embed.setColor(`RANDOM`);
      Embed.setFooter(
        `ID: ${message.author.id}`
      );
      return message.channel.send(Embed);
    } else {
      let User = message.mentions.members.first();
      User.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      Embed.setTitle(`${bot.users.cache.get(User.id).tag}的頭像!`);
      Embed.setImage(bot.users.cache.get(User.id).displayAvatarURL());
      Embed.setColor(`RANDOM`);
      Embed.setFooter(
        `ID: ${User.id}`
      );
      return message.channel.send(Embed);
    }
  },
};
