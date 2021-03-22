const Discord = require("discord.js")
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return;
  var langchar = settings.getSetting('lang', message.guild.id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(lang.get('setprefix_title', langchar))
    .setColor('#edd500')
    .setDescription(lang.get('setprefix_not_changed', langchar))
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  if (!args.length) {
    embed1.setTitle(lang.get('setprefix_error', langchar))
      .setDescription(lang.get('setprefix_not_mentioned', langchar))
      .setColor('#bd1300');
  }else{
    const newprefix = args[0];
    dp.setPrefix(newprefix, message.guild.id);
    embed1.setDescription(lang.get('setprefix_changed', langchar)+newprefix)
    client.logger.log('info', `Set prefix to ${newprefix} in ${message.guild.name}`)
  }
  message.channel.send(embed1);
}