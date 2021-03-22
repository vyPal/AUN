const Discord = require('discord.js');
const dp = require('discord-prefix');
const DisTube = require('distube');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let filter = client.distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
        client.logger.log('info', `Changed filter in ${message.guild.id}`)
}