const Discord = require("discord.js");
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
  .setTitle('Chill help menu')
  .setColor('#0db9f2')
  .setDescription('<> - required\n() - optional\n\n'+prefix+'help - helps you :D\n'+prefix+'ban <@user> (reason) - bans a user\n'+prefix+'unban <@user> - unbans the user\n'+prefix+'kick <@user> (reason) - kicks the user\n'+prefix+'setprefix <prefix> - sets a new prefix')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + 'ms | Page 1')
  const embed2 = new Discord.MessageEmbed()
  .setAuthor('Chill', 'https://drive.google.com/uc?export=view&id=1-RqwxYN7Bw4Xkt0oE6UwiHp1mSacbQWL')
  .setTitle('Chill help menu')
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