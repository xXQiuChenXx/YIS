const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json')
const prefix = config.prefix;
const bot = new Discord.Client({disableMentions:'everyone'});
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command","server"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{ 
    require('./events/client/ready')(bot)
})
bot.on('ready',async message=>{ 
    require('./events/client/console')(bot,message,config)
})
bot.on('message',async message=>{
    message.member //-- GuildMember based
    message.author //-- User based
    require('./events/guild/message')(bot,message,config)
})
bot.on('message',async message=>{
    require('./events/client/whitelist')(bot,message,config)
})
bot.on("ready", () => {
    bot.user.setActivity("創造建築伺服器");
  })
bot.on('ready',async message=>{ 
    require('./events/client/start')(bot,message,config)
})
bot.on('ready',async message=>{
    require('./events/client/status')(bot,message,config)
})
bot.on('ready',()=>{ 
    require('./events/client/invite')(bot)
})
bot.login(process.env.token)

bot.on('ready',()=>{ 
    process.on('uncaughtException', function(err) {
        const channel = bot.channels.cache.get(config.ConsoleChannel)
        const embed = new Discord.MessageEmbed()
        .setTitle("**发生错误: **" + err.message)
        .setDescription("```" + err.stack + "```")
        channel.send(embed)
    });
})