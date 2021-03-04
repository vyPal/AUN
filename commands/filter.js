const Discord = require('discord.js');
const dp = require('discord-prefix');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const query = args.join(' ');
  let filter = client.distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
}