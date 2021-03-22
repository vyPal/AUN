const Discord = require("discord.js");
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
  const text = client.emojis.get("822396536193155092");
  client.logger.log('info', `New default channel for ${message.guild.name}`)
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(text + lang.get('defaultchannel_title', langchar))
    .setColor('#edd500')
    .setDescription(lang.get('defaultchannel_not_changed', langchar))
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  if (!args.length) {
    embed1.setTitle(lang.get('defaultchannel_error', langchar))
      .setDescription(lang.get('defaultchannel_not_mentioned', langchar))
      .setColor('#bd1300');
  }else{
    const newchannel = message.mentions.channels.first();
    settings.setSetting(newchannel, 'defaultchannel', message.guild.id);
    embed1.setDescription(lang.get('defaultchannel_changed', langchar)+newchannel)
  }
  message.channel.send(embed1);
}