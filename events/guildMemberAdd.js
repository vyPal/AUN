const settings = require('discord-server-settings');

module.exports = async (client, member) => {
  const guild = await member.guild;
  const uname = await member.user.id;
  if(await settings.getSetting('welcomer_join', guild.id) == 'true'){
    const joinchannel = await settings.getSetting('welcomer_join_channel', guild.id)
    const channel = await guild.channels.cache.get(joinchannel)
    const joinmessage = await settings.getSetting('welcomer_join_msg', guild.id)
    channel.send(joinmessage.replace("(member)", `<@${uname}>`))
  }
}