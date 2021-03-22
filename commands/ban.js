const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  if (!message.member.permissions.has("BAN_MEMBERS")) return idonthaveperms(message, client);
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
    var noerror = true;
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const reason = args.slice(1).join(' ') || lang.get('ban_no_reason', langchar);
  client.logger.log('info', `Ban ${member.user.id}`)
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('ban_title', langchar))
  .setColor('#ed3f2c')
  .setDescription(lang.get('ban_noone_banned', langchar))
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  const embed = new Discord.MessageEmbed()
  .setTitle(lang.get('ban_you_title', langchar))
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setColor(0x00AE86)
  .setDescription(lang.get('ban_you_part1', langchar)+message.guild.name+lang.get('ban_you_part2', langchar)+message.author.tag+lang.get('ban_you_part3', langchar)+reason)
  .setFooter("Ping: "+client.ws.ping+" | AUN discord bot")
  .setTimestamp();
  if (!member) {
    embed1.setTitle(lang.get('ban_error', langchar))
      .setDescription(lang.get('ban_no_mention', langchar))
      .setColor('#bd1300');
      noerror = false;
  }else{
    if (!member.kickable) {
        embed1.setTitle(lang.get('ban_error', langchar))
      .setDescription(lang.get('ban_cant_ban', langchar))
      .setColor('#bd1300');
      noerror = false;
    }
  }
    if(noerror){
        embed1.setDescription(lang.get('ban_banned_part1', langchar)+member.user.tag+lang.get('ban_banned_part2', langchar));
    }
    message.channel.send(embed1);
  try{
    member.user.send(embed);
    return member.ban({days: 0, reason: `${reason}`});
  }catch (e){
      client.logger.log('error', e)
    }
}