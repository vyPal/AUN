const Discord = require('discord.js');

module.exports = (client, message, queue, song) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Added to queue")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setDescription(`Added ${song.name} - ${song.formattedDuration}\nRequested by ${song.user}`)
  .setColor('#009dff')
  .setFooter('AUN Music')
  .setTimestamp();
  message.channel.send({embed});
}