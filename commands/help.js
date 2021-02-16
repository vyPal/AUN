const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  var langchar = settings.getSetting('lang', message.guild.id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('help_title', langchar))
  .setColor('#0db9f2')
  .setDescription('<> - '+lang.get('help_required', langchar)+'\n() - '+lang.get('help_optional', langchar)+'\n\n'+prefix+'help - '+lang.get('help_help', langchar)+'\n'+prefix+'ban <@user> (reason) - '+lang.get('help_ban', langchar)+'\n'+prefix+'unban <@user> - '+lang.get('help_unban', langchar)+'\n'+prefix+'kick <@user> (reason) - kicks the user\n'+prefix+'setprefix <prefix> - sets a new prefix')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Page 1')
  const embed2 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('help_title', langchar))
  .setColor('#0db9f2')
  .setDescription('')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Page 2')
  return message.channel.send({embed: embed1}).then(embedMessage => {
      embedMessage.react('⬅').then(() => {embedMessage.react('➡')})
      .then(() => {
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
          const backwards = embedMessage.createReactionCollector(backwardsFilter/*, {timer: 6000}*/);
          const forwards = embedMessage.createReactionCollector(forwardsFilter/*, {timer: 6000}*/);
          backwards.on('collect', () => {
              embedMessage.edit(embed1)
          })
          forwards.on('collect', () => {
              embedMessage.edit(embed2)
          })
      });
  });
}