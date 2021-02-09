const Discord = require("discord.js")
const dp = require('discord-prefix');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const embed1 = new Discord.MessageEmbed()
    .setAuthor('Chill', 'https://drive.google.com/uc?export=view&id=1-RqwxYN7Bw4Xkt0oE6UwiHp1mSacbQWL')
    .setTitle('Server prefix changed')
    .setColor('#edd500')
    .setDescription('This server\'s prefix was not changed')
    .setTimestamp()
    .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  if (!args.length) {
    embed1.setTitle('Error')
      .setDescription('You did not specify a new prefix!')
      .setColor('#bd1300');
  }else{
    const newprefix = args[0];
    dp.setPrefix(newprefix, message.guild.id);
    embed1.setDescription('This server\'s prefix was changed to '+newprefix)
  }
  message.channel.send(embed1);
}