const Discord = require('discord.js');
const dp = require('discord-prefix');
const DisTube = require('distube');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const query = args.join(' ');
  client.distube.play(message, query);
  client.logger.log('info', `Played ${query} in ${message.guild.name}`)
}