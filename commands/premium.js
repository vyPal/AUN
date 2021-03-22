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
    .setTitle("AUN Premium")
    .setColor('#edd500')
    .setDescription(`View your premium status at https://www.aunbot.tk/me/premium\nView the docs at https://www.aunbot.tk/docs/premium\n or enable premium for this server at https://www.aunbot.tk/server?id=${message.guild.id}`)
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  message.channel.send(embed1);
  client.logger.log('info', `${message.guild.name} wants premium`)
}