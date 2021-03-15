const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = async (message, client) => {
  var langchar = settings.getSetting('lang', message.guild.id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var welcomer_join = await settings.getSetting('welcomer_join', message.guild.id) || 'false';
  var welcomer_leave = await settings.getSetting('welcomer_leave', message.guild.id) || 'false';
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const yes = client.emojis.cache.get('819524813789855774');
  const no = client.emojis.cache.get('819524846442250260')
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`Welcome to the welcomer module settings!\n\nReact with ${yes} to configure welcomer join\nReact with ${no} to configure welcomer leave`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')
  const embed2 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`You are configuring welcomer join\n\nReply to this message with the channel that you want to be the join channel`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')
  const embed3 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`You are configuring welcomer join\n\nReply to this message with the message, that you want to send on member join. You can use (member) to mention the user, (server) to include the server name, and (members) to include the member count.`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')
  const embed4 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`You are configuring welcomer join\n\nConfiguration done. The module is now enabled.`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')

  const embed5 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`You are configuring welcomer leave\n\nReply to this message with the channel that you want to be the leave channel`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')
  const embed6 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`You are configuring welcomer leave\n\nReply to this message with the message, that you want to send on member leave. You can use (member) to mention the user, (server) to include the server name, and (members) to include the member count.`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')
  const embed7 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcomer settings')
  .setColor('#0db9f2')
  .setDescription(`You are configuring welcomer leave\n\nConfiguration done. The module is now enabled.`)
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Welcomer')

  return message.channel.send({embed: embed1}).then(embedMessage => {
      embedMessage.react(yes).then(() => {embedMessage.react(no)})
      .then(() => {
          const backwardsFilter = (reaction, user) => reaction.emoji === yes && user.id === message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji === no && user.id === message.author.id;
          const filter = m => m.author.id === message.author.id
          const backwards = embedMessage.createReactionCollector(backwardsFilter/*, {timer: 30000}*/);
          const forwards = embedMessage.createReactionCollector(forwardsFilter/*, {timer: 30000}*/);
          backwards.on('collect', (reaction, user) => {
              embedMessage.edit(embed2)
              reaction.users.remove(user.id)
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000
              })
              .then(message => {
                message = message.first()
                const channel = message.mentions.channels.first()
                message.delete()
                embedMessage.edit(embed3)
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 30000
                })
                .then(message => {
                  message = message.first()
                  const joinmsg = message.content;
                  embedMessage.edit(embed4)
                  message.delete()
                  settings.setSetting('true', 'welcomer_join', message.guild.id)
                  settings.setSetting(channel.id, 'welcomer_join_channel', message.guild.id)
                  settings.setSetting(joinmsg, 'welcomer_join_msg', message.guild.id)
                })
              })
          })
          forwards.on('collect', (reaction, user) => {
              embedMessage.edit(embed5)
              reaction.users.remove(user.id)
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000
              })
              .then(message => {
                message = message.first()
                const channel = message.mentions.channels.first()
                message.delete()
                embedMessage.edit(embed6)
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 30000
                })
                .then(message => {
                  message = message.first()
                  const joinmsg = message.content;
                  embedMessage.edit(embed7)
                  message.delete()
                  settings.setSetting('true', 'welcomer_leave', message.guild.id)
                  settings.setSetting(channel, 'welcomer_leave_channel', message.guild.id)
                  settings.setSetting(joinmsg, 'welcomer_leave_msg', message.guild.id)
                })
              })
          })
      });
  });
}