const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');
const idonthaveperms = require("../mt/idonthaveperms");

module.exports = (message, client) => {
  if (!message.member.permissions.has("MANAGE_ROLES")) idonthaveperms(message, client);
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
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('mute_title', langchar))
  .setColor('#ed3f2c')
  .setDescription(lang.get('mute_noone_muted', langchar))
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  const embed = new Discord.MessageEmbed()
  .setTitle(lang.get('mute_you_title', langchar))
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setColor(0x00AE86)
  .setDescription(lang.get('mute_you_part1', langchar)+message.guild.name+lang.get('mute_you_part2', langchar)+message.author.tag+lang.get('mute_you_part3', langchar)+reason)
  .setFooter("Ping: "+client.ws.ping+" | AUN discord bot")
  .setTimestamp();
  if (!member) {
    embed1.setTitle(lang.get('mute_error', langchar))
      .setDescription(lang.get('mute_no_mention', langchar))
      .setColor('#bd1300');
      noerror = false;
  }else{
    if (!member.kickable) {
        embed1.setTitle(lang.get('mute_error', langchar))
      .setDescription(lang.get('mute_cant_mute', langchar))
      .setColor('#bd1300');
      noerror = false;
    }
  }
    if(noerror){
        embed1.setDescription(lang.get('mute_muted_part1', langchar)+member.user.tag+lang.get('mute_muted_part2', langchar));
        member.user.send(embed);
    }
    message.channel.send(embed1);
  try{
      return member.roles.add(muterole);
  }catch{
      return;
    }
}