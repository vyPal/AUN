const {owner_id} = require('../config/config.json');
const dp = require('discord-prefix');
const Discord = require("discord.js");
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  console.log(message.author.id);
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  var guildList = client.guilds.cache.array();
  var msgssent = 0;
  try {
    guildList.forEach(guild => {
      let defaultChannel = "";
      deafultChannel = client.channels.cache.get(settings.getSetting('defaultchannel', message.guild.id));
      if(!defaultChannel) {
        guild.channels.cache.forEach((channel) => {
          if(channel.type == "text" && defaultChannel == "") {
            if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
              defaultChannel = channel;
              settings.setSetting(channel, 'defaultchannel', message.guild.id)
            }
          }
        });
      }
      defaultChannel.send(args.join(' '));
      msgssent += 1;
    });
  } catch (err) {
    console.log(err)
  }
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle(lang.get('broadcast_title', langchar))
    .setColor('#edd500')
    .setDescription(lang.get('broadcast_part1', langchar)+msgssent+lang.get('broadcast_part2', langchar))
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  message.channel.send(embed1)
}