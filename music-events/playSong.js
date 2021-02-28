const Discord = require('discord.js');

module.exports = (message, queue, song) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Now playing")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setDescription(`Now playing ${song.name} - ${song.formattedDuration}\nRequested by ${song.user}`)
  .setColor('#009dff')
  .setFooter('Ping: ' + client.ws.ping + ' | AUN Music')
  .setTimestamp();
  message.channel.send({embed});
}