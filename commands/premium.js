const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');
const {owner_id} = require('../config/config.json');

module.exports = (message, client) => {
  var langchar = settings.getSetting('lang', message.guild.id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  let noerror = true;
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(lang.get('premium_title', langchar))
    .setColor('#edd500')
    .setDescription(lang.get('premium_not_changed', langchar))
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  if (message.author.id != owner_id) {
    embed1.setTitle(lang.get('premium_error', langchar))
      .setDescription(lang.get('premium_not_owner', langchar))
      .setColor('#bd1300');
      noerror = false;
  }
  if(noerror == true){
    if(settings.getSetting('premium', message.guild.id) === 'true') {
      settings.setSetting('false', 'premium', message.guild.id);
      embed1.setDescription(lang.get('premium_changed', langchar) + "disabled")
    }else{
      settings.setSetting('true', 'premium', message.guild.id);
      embed1.setDescription(lang.get('premium_changed', langchar) + "enabled")
    }
  }
  message.channel.send(embed1);
}