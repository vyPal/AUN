const settings = require('discord-server-settings');

module.exports = async (client, member) => {
  const guild = await member.guild;
  const uname = await member.user.id;
  const guildname = await member.guild.name;
  const membercount = await member.guild.memberCount;
  if(await settings.getSetting('welcomer_leave', guild.id) == 'true'){
    const leavechannel = await settings.getSetting('welcomer_leave_channel', guild.id)
    const channel = await guild.channels.cache.get(leavechannel)
    let leavemessage = await settings.getSetting('welcomer_leave_msg', guild.id)
    leavemessage = leavemessage.replace("(member)", `<@${uname}>`)
    leavemessage = leavemessage.replace("(server)", `<@${guildname}>`)
    leavemessage = leavemessage.replace("(members)", `<@${membercount}>`)
    channel.send(leavemessage)
  }
}