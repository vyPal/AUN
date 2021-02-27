const settings = require('discord-server-settings');

module.exports = (client, guild) => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  //defaultChannel will be the channel object that the bot first finds permissions for
  defaultChannel.send("```Hello, I'm AUN. You can start using me by typing .help```");
  settings.setSetting(defaultChannel, 'defaultchannel', guild.id);
  settings.setSetting('en', 'lang', guild.id);
  settings.setSetting(false, 'premium', guild.id);
}