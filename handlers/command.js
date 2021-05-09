const { readdirSync } = require("fs");
module.exports = (bot) => {
    readdirSync("./commands/").map(dir => {
       const commands = readdirSync(`./commands/${dir}/`).map(cmd=>{
           let pull = require(`../commands/${dir}/${cmd}`)
           console.log(`✔ 成功加载指令 ${pull.name}`)
           bot.commands.set(pull.name,pull)
           if(cmd.aliases){
               cmd.aliases.forEach(p=>{
                   bot.aliases.set(p,pull)
               })
           }
       })
    })
}