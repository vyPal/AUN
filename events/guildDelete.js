const settings = require('discord-server-settings');

module.exports = (client, guild) => {
  settings.remSetting('defaultchannel', guild.id);
  settings.remSetting('lang', guild.id);
  settings.remSetting('premium', guild.id);
  console.log('Aun left '+guild.name+' with '+guild.memberCount+' members')
}