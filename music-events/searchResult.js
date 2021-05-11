const Discord = require('discord.js');

module.exports = (client, message, result) => {
  let i = 0;
  const embed = new Discord.MessageEmbed()
  .setTitle("Pick a song")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
  .setColor('#009dff')
  .setFooter('AUN Music')
  .setTimestamp();
  message.channel.send({embed});
}