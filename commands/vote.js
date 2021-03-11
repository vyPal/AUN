const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');
const Topgg = require(`@top-gg/sdk`)

module.exports = async (message, client) => {(message, client);
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const api = new Topgg.Api(process.env.TOP_GG_TOKEN)
  var voted = await api.hasVoted(message.author.id)
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle(lang.get('vote_title', langchar))
  .setDescription(lang.get('vote_text', langchar))
  .setColor('#00ffae')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  if(voted == true) {
    embed1.setDescription(lang.get('vote_voted', langchar))
  }
    message.channel.send(embed1);
}