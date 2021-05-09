module.exports = (bot) => {
    const invites = {} // { guildId: { memberId: count } }
  
    const getInviteCounts = async (guild) => {
      return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
          const inviteCounter = {} // { memberId: count }
  
          invites.forEach((invite) => {
            const { uses, inviter } = invite
            const { username, discriminator } = inviter
  
            const name = `${username}#${discriminator}`
  
            inviteCounter[name] = (inviteCounter[name] || 0) + uses
          })
  
          resolve(inviteCounter)
        })
      })
    }
  
    bot.guilds.cache.forEach(async (guild) => {
      invites[guild.id] = await getInviteCounts(guild)
    })
  
    bot.on('guildMemberAdd', async (member) => {
      const { guild, id } = member
  
      const invitesBefore = invites[guild.id]
      const invitesAfter = await getInviteCounts(guild)
  
  
      for (const inviter in invitesAfter) {
        if (invitesBefore[inviter] === invitesAfter[inviter] - 1) {
          const channelId = '724030449717870634'
          const channel = guild.channels.cache.get(channelId)
          const count = invitesAfter[inviter]
          channel.send(
            `[系統通知] <@${id}> 是由${inviter}邀請 (共邀請了:${count})`
          )
  
          invites[guild.id] = invitesAfter
          return
          //const channel = guild.channels.filter(c => c.type === 'text').find(x => x.position == 0);
        }
      }
    })
  }