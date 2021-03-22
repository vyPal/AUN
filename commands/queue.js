const Discord = require('discord.js');
const dp = require('discord-prefix');
const DisTube = require('distube');

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const query = args.join(' ');
  let queue = client.distube.getQueue(message)
    message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
  client.logger.log('info', `Showed queue in ${message.guild.name}`)
}