const settings = require('discord-server-settings');

module.exports = async (client, member) => {
  const guild = await member.guild;
  const uname = await member.user.id;
  if(await settings.getSetting('welcomer_leave', guild.id) == 'true'){
    const leavechannel = await settings.getSetting('welcomer_leave_channel', guild.id)
    const channel = await guild.channels.cache.get(leavechannel)
    const leavemessage = await settings.getSetting('welcomer_leave_msg', guild.id)
    channel.send(leavemessage.replace("(member)", `<@${uname}>`))
  }
}