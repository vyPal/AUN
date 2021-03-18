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
  defaultChannel.send("```Hello, I'm AUN. You can start using me by typing .help```\nPlease make sure to join our discord server at https://discord.gg/mmyvm5HXGn");
  settings.setSetting(defaultChannel, 'defaultchannel', guild.id);
  settings.setSetting('en', 'lang', guild.id);
  settings.setSetting('false', 'premium', guild.id);
  console.log('Aun was added to '+guild.name+' with '+guild.memberCount+' members!')
}