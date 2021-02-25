const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) return;
  var langchar = settings.getSetting('lang', message.guild.id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  var noerror = true
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('kick_title', langchar))
  .setColor('#ed3f2c')
  .setDescription('Nobody was kicked')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command)
  if (!member) {
    embed1.setTitle(lang.get('kick_error', langchar))
      .setDescription(lang.get('kick_no_mention', langchar))
      .setColor('#bd1300')
      noerror = false
  }else{
      if (!member.kickable) {
        embed1.setTitle(lang.get('kick_error', langchar))
      .setDescription(lang.get('kick_cant_kick', langchar))
      .setColor('#bd1300')
      noerror = false
    }
  }
    if(noerror){
        embed1.setDescription(lang.get('kick_kicked_part1', langchar)+member.user.tag+lang.get('kick_kicked_part2', langchar))
    }
    message.channel.send(embed1)
  try{
      return member.kick()
  }catch{
      return
    }
}