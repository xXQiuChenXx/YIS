const Discord = require('discord.js');
module.exports = async (bot, message, config) => {
    process.on('uncaughtException', function(err) {
        const channel = bot.channels.cache.get(config.ConsoleChannel)
        const embed = new Discord.MessageEmbed()
        .setTitle("**发生错误: **" + err.message)
        .setDescription("```" + err.stack + "```")
        channel.send(embed)
    });
}