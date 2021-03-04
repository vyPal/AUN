const Discord = require('discord.js');

module.exports = (client, message) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Search canceled")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setDescription(`The search was canceled`)
  .setColor('#009dff')
  .setFooter('AUN Music')
  .setTimestamp();
  message.channel.send({embed});
}