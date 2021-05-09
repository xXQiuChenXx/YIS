module.exports = async (bot, message, config) => {
    const channel = bot.channels.cache.get(config.BotChannel)
    let OldPinned = await channel.messages.fetchPinned()
    channel.bulkDelete(OldPinned, true)
    let sent = await channel.send('**機器人已刷新, 製作by秋辰**')
    await sent.pin({ reason: 'important' })
    await channel.messages.fetch({ limit: 1 }).then(messages => {
        channel.bulkDelete(messages)
    })
}