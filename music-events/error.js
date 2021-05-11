const Discord = require('discord.js');

module.exports = (client, message, e) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Error")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setDescription(`I am sorry but I have encountered an error. Code: ${e}`)
  .setColor('#009dff')
  .setFooter('AUN Music')
  .setTimestamp();
  message.channel.send({embed});
}