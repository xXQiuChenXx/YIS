const Discord = require("discord.js");
const dns = require("dns")
module.exports = {
    name: "domain",
    description: "檢測域名數字IP",
    usage: "domain <域名>",
    category: "信息",
    run: async (bot, message, args) => {
        if(!args[0]){
            return message.reply("請指定你要搜索的域名")
        }
        dns.lookup(args[0], (err, address, family) => {
            if(err) {
                return message.channel.send("哎呀，出錯了..." + "\n" + "```" + err.message + "```")
            }
            printResult(address);
        });
          
        function printResult(address){
            const embed = new Discord.MessageEmbed()
            .setTitle(`**域名:** ${args[0]}`)
            .setDescription(`IP: ${address}\n注意：信息可能會錯/不准確`)
            .setColor("RANDOM")
            message.channel.send(embed)
        }
    }
}