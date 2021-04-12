const Discord = require("discord.js");
const reply = require('../utils/interaction_reply.js');
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (client, interaction) => {
  const { name, options } = interaction.data;
  const { guild_id, member } = interaction;
  const command = name.toLowerCase();
  let args = {};

  if(options) {
    for(const option of options) {
      const { name, value } = option;
      args[name.toLowerCase()] = value;
    }
  }

  if (!member) return reply(client, interaction, 'Please use this command in a server.');
  if (!((member.permissions & 0x4) == 0x4)) return reply(client, interaction, 'You do not have permission to do that.');

  let prefix = dp.getPrefix();
  if(dp.getPrefix(guild_id)){
    prefix = dp.getPrefix(guild_id);
  }
  var langchar = settings.getSetting('lang', guild_id)
    var noerror = true;
  const membertoban = client.guilds.resolve(guild_id).members.cache.get(args['user']);
  const reason = args['reason'] || lang.get('ban_no_reason', langchar);
  client.logger.log('info', `Ban ${membertoban.user.id}`)
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
  .setDescription(lang.get('ban_you_part1', langchar)+client.guilds.resolve(guild_id).name+lang.get('ban_you_part2', langchar)+member.user.tag+lang.get('ban_you_part3', langchar)+reason)
  .setFooter("Ping: "+client.ws.ping+" | AUN discord bot")
  .setTimestamp();
  if (!membertoban) {
    embed1.setTitle(lang.get('ban_error', langchar))
    .setDescription(lang.get('ban_no_mention', langchar))
    .setColor('#bd1300');
    noerror = false;
  }else{
    if (!membertoban.kickable) {
      embed1.setTitle(lang.get('ban_error', langchar))
      .setDescription(lang.get('ban_cant_ban', langchar))
      .setColor('#bd1300');
      noerror = false;
    }
  }
  if(noerror){
    embed1.setDescription(lang.get('ban_banned_part1', langchar)+membertoban.user.tag+lang.get('ban_banned_part2', langchar));
    try{
      membertoban.user.send(embed);
      return membertoban.ban({days: 0, reason: `${reason}`});
    }catch (e){
      client.logger.log('error', e)
    }
  }
  reply(client, interaction, embed1);
}