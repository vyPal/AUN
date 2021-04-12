const Discord = require('discord.js');
const reply = require('../utils/interaction_reply.js');
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (client, interaction) => {
  var langchar = settings.getSetting('lang', interaction.guild_id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(interaction.guild_id)){
    prefix = dp.getPrefix(interaction.guild_id);
  }

  const { name, options } = interaction.data;
  const command = name.toLowerCase();
  let args = {}

  if(options) {
    for(const option of options) {
      const { name, value } = option;
      args[name.toLowerCase()] = value;
    }
  }

  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(lang.get('help_title', langchar))
    .setColor('#0db9f2')
    .setDescription('<> - '+lang.get('help_required', langchar)+'\n() - '+lang.get('help_optional', langchar)+'\n* - '+lang.get('help_onlypremium', langchar)+'\n\n')
    .addFields(
      { name: 'Info', value: `${prefix}help - ${lang.get('help_help', langchar)}\n${prefix}info - ${lang.get('help_info', langchar)}` },
      { name: 'Moderation', value: `${prefix}ban <@user> (reason) - ${lang.get('help_ban', langchar)}\n${prefix}unban <@user> (reason) - ${lang.get('help_unban', langchar)}\n${prefix}kick <@user> (reason) - ${lang.get('help_kick', langchar)}\n${prefix}mute <@user> (reason) - ${lang.get('help_mute', langchar)}\n${prefix}unmute <@user> (reason) - ${lang.get('help_unmute', langchar)}` },
      { name: 'Settings', value: `${prefix}setprefix <prefix> - ${lang.get('help_setprefix', langchar)}\n${prefix}language <locale> - ${lang.get('help_language', langchar)}\n${prefix}defaultchannel <#channel> - ${lang.get('help_defaultchannel', langchar)}` },)
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + 'ms | Page 1')
  const embed2 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(lang.get('help_title', langchar))
    .setColor('#0db9f2')
    .setDescription('<> - '+lang.get('help_required', langchar)+'\n() - '+lang.get('help_optional', langchar)+'\n* - '+lang.get('help_onlypremium', langchar)+'\n\n')
    .addFields(
      {name: 'Fun', value: `${prefix}say <sentance> - ${lang.get('help_say', langchar)} *\n${prefix}meme - ${lang.get('help_meme', langchar)}`},
      {name: 'Music', value: `${prefix}play <song name> - ${lang.get('help_play', langchar)}\n${prefix}stop - ${lang.get('help_stop', langchar)}\n${prefix}skip - ${lang.get('help_skip', langchar)}\n${prefix}loop - ${lang.get('help_loop', langchar)}\n${prefix}volume <0-100> - ${lang.get('help_volume', langchar)}\n${prefix}autoplay - ${lang.get('help_autoplay', langchar)}\n`},
    )
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + 'ms | Page 2')
  if(args['page']) {
    if(args['page'] == 1) {
      reply(client, interaction, embed1)
    }else if(args['page'] == 2) {
      reply(client, interaction, embed2)
    }else {
      reply(client, interaction, embed1)
    }
  }else {
    reply(client, interaction, embed1)
  }
}