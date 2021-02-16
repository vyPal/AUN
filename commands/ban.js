const Discord = require("discord.js")
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
  const reason = args[1] || "a reason not specified";
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('User was banned')
  .setColor('#ed3f2c')
  .setDescription('Nobody was banned')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command)
  message.channel.send(member);
  const embed = new Discord.MessageEmbed()
  .setTitle("You were banned")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setColor(0x00AE86)
  .setDescription("You were banned from "+message.guild.name+", by "+message.author.name+", for "+reason)
  .setFooter("Ping: "+client.ws.ping+" | AUN discord bot")
  .setTimestamp()
  //client.fetchUser(member).then(user => {user.send(embed)})
  if (!member) {
    embed1.setTitle('Error')
      .setDescription('You did not mention a user!')
      .setColor('#bd1300')
      noerror = false
  }else{
    if (!member.kickable) {
        embed1.setTitle('Error')
      .setDescription('This member cannot be banned!')
      .setColor('#bd1300')
      noerror = false
    }
  }
    if(noerror){
        embed1.setDescription('User '+member.user.tag+' was banned from this server')
    }
    message.channel.send(embed1)
  try{
      return member.ban()
  }catch{
      return
    }
}