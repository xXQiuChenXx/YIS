const Discord = require('discord.js');
module.exports={
    name:"l",
    description:"發送匿名信息",
    usage:"l <信息>",
    category:"信息",
    run:async(bot,message,args)=>{
        if(!args[0]) {
            message.reply("指令正確用法:  &l <信息>")
        }
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(args.join(" "))
        message.channel.send(embed)
        message.delete()
    }
}