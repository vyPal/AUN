const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  if (!message.member.permissions.has("MANAGE_ROLES")) return;
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
  if (!muterole) {
    message.channel.send("```Mute role doesn't exist. Creating...```");
    message.guild.roles.create({data: {name: 'Muted'}});
    muterole = message.guild.roles.cache.find(role => role.name === "Muted");
  }
  try {
    message.guild.channels.cache.forEach((channel, id) => {
      channel.updateOverwrite(muterole, {
        SEND_MESSAGES: false,
        SPEAK: false,
        ADD_REACTIONS: false,
        SEND_TTS_MESSAGES: false,
        ATTACH_FILES: false 
      })
    });
  }
  catch (e) {
    throw e;
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
    var noerror = true;
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const reason = args.slice(1).join(' ') || lang.get('mute_no_reason', langchar);
  let lockdown = settings.getSetting('lockdown', message.guild.id);
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('mute_title', langchar))
  .setColor('#ed3f2c')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
    embed1.setDescription('lockdown...');
    message.channel.send(embed1);
  message.guild.members.cache.forEach(member => {
    if(lockdown == 'true') {
      try {
        member.roles.remove(muterole);
      }catch{
        
      }
    }else if(lockdown == 'false') {
      try {
        member.roles.add(muterole);
      }catch{
        
      }
    }
  })
  if(lockdown == 'true'){
    lockdown = 'false';
  }else if(lockdown == 'false'){
    lockdown = 'true';
  }
}