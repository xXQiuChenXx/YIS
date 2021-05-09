const fetch = require('node-fetch')
module.exports={
    name: "translate",
    description: "翻譯字",
    usage: "translate [custom] [原語言] [過後的語言] <文本>",
    category: "信息",
    run: async(bot, message, args, config, headers) => {
        let xinrui;
        let text
        if(args[0] === "custom") {
            if(args[3]) {
            text = args.slice(3, args.length).join(" ")
            let url = `${config.api}translate?from=${args[1]}&to=${args[2]}&text=${encodeURI(text)}`
            xinrui = await fetch(url, {headers}).then(url => url.json());
            }
        } else {
            text = args.join(" ")
            let url = `${config.api}translate?to=zh-tw&text=${encodeURI(text)}`
           xinrui = await fetch(url, {headers}).then(url => url.json());
        }
        try {
            xinrui.status
        } catch(e) {
            return message.channel.send("哎呀，出错了...")
        }
        if (xinrui.status === "success") {
            message.channel.send(xinrui.data)
        } else {
            message.channel.send(xinrui.error)
        }
    }
}
