const settings = require('discord-server-settings');

module.exports = async (client, member) => {
  const guild = await member.guild;
  const uname = await member.user.id;
  const username = await member.user.username;
  const guildname = await member.guild.name;
  const membercount = await member.guild.memberCount;
  if(await settings.getSetting('welcomer_join', guild.id) == 'true'){
    const joinchannel = await settings.getSetting('welcomer_join_channel', guild.id)
    const channel = await guild.channels.cache.get(joinchannel)
    let joinmessage = await settings.getSetting('welcomer_join_msg', guild.id)
    joinmessage = joinmessage.replace("(member)", `<@${uname}>`)
    joinmessage = joinmessage.replace("(server)", `${guildname}`)
    joinmessage = joinmessage.replace("(members)", `${membercount}`)
    channel.send(joinmessage)
  }
  client.logger.log('info', `${username} joined ${guildname}`);
}