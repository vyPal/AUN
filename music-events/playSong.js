const Discord = require('discord.js');

module.exports = (client, message, queue, song) => {
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
  const embed = new Discord.MessageEmbed()
  .setTitle("Now playing")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setDescription(`Now playing ${song.name} - ${song.formattedDuration}\nRequested by ${song.user}`)
  .setColor('#009dff')
  .setFooter('AUN Music')
  .setTimestamp();
  message.channel.send({embed});
}