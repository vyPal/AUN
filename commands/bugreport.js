const dp = require('discord-prefix');
const Discord = require("discord.js");
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const magiccode = client.uptime + "|" + message.author.id;
  client.logger.log('info', `Bug reported by ${message.author.tag}`)
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(lang.get('bugreport_title_done', langchar))
    .setColor('#edd500')
    .setDescription(lang.get('bugreport_description_done', langchar))
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  client.logger.log('info', `/------BUG ${magiccode} BUG------\\`)
  client.logger.log('warn', `/------BUG ${magiccode} BUG------\\`)
  client.logger.log('error', `/------BUG ${magiccode} BUG------\\`)
  const embed2 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle("We found a bug!")
    .setColor('#edd500')
    .setDescription(`It looks like ${message.author.username} found a bug in ${message.guild.name}! \n\nReport: ${args.join(' ')}\n\nReport ID: ${message.guild.id+"-"+message.author.id}\n\nMagic code: ${magiccode}`)
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  message.channel.send(embed1)
  client.channels.cache.get('814499114989125684').send(embed2);
}