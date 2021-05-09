const Discord = require('discord.js');
module.exports = {
    name: "skin",
    category: 'Minecraft',
    usage: "skin <MC id>",
    description: "查看麦块皮肤",
    run: async (bot, message, args) => {
        const name = args.join(" ");
        if (!name) {
            return message.reply("请输入一个Minecraft ID")
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`**${name} 的麦块皮肤**`)
            .setImage(`https://minotar.net/armor/body/${name}/490.png`)
        message.channel.send(embed);
    }
}
