const Discord = require("discord.js");
const dp = require('discord-prefix');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
    .setTitle('Server language changed')
    .setColor('#edd500')
    .setDescription('This server\'s language was not changed')
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  if (!args.length) {
    embed1.setTitle('Error')
      .setDescription('You did not specify a new language! (Available: en, cz)')
      .setColor('#bd1300');
  }else{
    const newlanguage = args[0];
    settings.setSetting(newlanguage, 'lang', message.guild.id);
    embed1.setDescription('This server\'s language was changed to '+newlanguage)
  }
  message.channel.send(embed1);
}