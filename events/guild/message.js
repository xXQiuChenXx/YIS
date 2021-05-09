const Timeout = new Set();
const ms = require('ms')
module.exports=async(bot,message,config)=>{
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);
    if(!message.guild) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const headers = {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36",
          "token": process.env.api
      };

    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    
    if (command) {
        if(command.timeout){
            if(Timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply(`你只能使用這個指令在每 ${ms(command.timeout)}!`)
            }else{
                
                command.run(bot, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }else{
            command.run(bot,message,args,config,headers)
        }

    }
}
