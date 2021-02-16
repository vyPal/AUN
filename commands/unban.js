const Discord = require("discord.js");
const dp = require('discord-prefix');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
    var noerror = true
  const member = args[0]
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('User was unbanned')
  .setColor('#ed3f2c')
  .setDescription('Nobody was unbanned')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command)
  if (!member) {
    embed1.setTitle('Error')
      .setDescription('You did not mention a user!')
      .setColor('#bd1300')
      noerror = false
  }
    if(noerror){
        embed1.setDescription('User '+member.user.tag+' was unbanned from this server')
    }
    message.channel.send(embed1)
  try{
      return member.unban()
  }catch{
      return
    }
}