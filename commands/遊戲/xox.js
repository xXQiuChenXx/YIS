const { tictactoe } = require('reconlx')

module.exports = {
    name: "xox",
    description: "遊戲!",
    usage: "xox <成员>",
    category: "遊戲",
    run: async (bot, message, args) => {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('你想跟誰玩?tag一個人吧')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}