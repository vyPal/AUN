const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');
const idonthaveperms = require("../mt/idonthaveperms");

module.exports = async (message, client) => {
  let lockdown = await settings.getSetting('lockdown', message.guild.id);
  if (!message.member.permissions.has("MANAGE_ROLES")) idonthaveperms(message, client);
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  if(lockdown == 'enabled') {
    lockdown = 'disabled';
    settings.setSetting(lockdown, 'lockdown', message.guild.id);
    try {
      message.guild.channels.cache.forEach((channel, id) => {
        channel.updateOverwrite(message.guild.roles.everyone, {
          SEND_MESSAGES: true,
          SPEAK: true,
          ADD_REACTIONS: true 
        })
      });
    }
    catch (e) {
      throw e;
    }
  }else{
    lockdown = 'enabled';
    settings.setSetting(lockdown, 'lockdown', message.guild.id);
    try {
      message.guild.channels.cache.forEach((channel, id) => {
        channel.updateOverwrite(message.guild.roles.everyone, {
          SEND_MESSAGES: false,
          SPEAK: false,
          ADD_REACTIONS: false
        })
      });
    }
    catch (e) {
      throw e;
    }
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
    var noerror = true;
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const reason = args.slice(1).join(' ') || lang.get('mute_no_reason', langchar);
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('mute_title', langchar))
  .setColor('#ed3f2c')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
    embed1.setDescription('Lockdown is now '+lockdown);
    message.channel.send(embed1);
}