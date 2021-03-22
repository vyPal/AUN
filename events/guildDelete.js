const settings = require('discord-server-settings');

module.exports = (client, guild) => {
  settings.remSetting('defaultchannel', guild.id);
  settings.remSetting('lang', guild.id);
  settings.remSetting('premium', guild.id);
  client.logger.log('info', 'Aun left '+guild.name+' with '+guild.memberCount+' members')
}