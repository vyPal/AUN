const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

const onlypremium = require('../mt/onlypremium');

module.exports = (message, client) => {
  if (settings.getSetting('premium', message.guild.id) != 'true') return onlypremium(message, client);
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const reason = args.slice(0).join(' ');
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(reason)
  .setColor('#00ffae')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
    message.channel.send(embed1);
    message.delete();
    client.logger.log('info', `Said ${reason} in ${message.guild.name}`)
}