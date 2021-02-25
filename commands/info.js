const Discord = require("discord.js")
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = (message, client) => {
  var langchar = settings.getSetting('lang', message.guild.id)
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const embed = new Discord.MessageEmbed()
  .setTitle("AUN Server and bot info")
  .setAuthor("AUN", "https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setColor("#00bfff")
  .setThumbnail("https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI")
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command) 

  client.shard.fetchClientValues('guilds.cache.size')
	.then(results => {
		console.log(`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total guilds`);
    let servers = `${results.reduce((acc, guildCount) => acc + guildCount, 0)}`;
    client.shard.fetchClientValues('users.cache.size')
    .then((result) => {
      console.log(`${result.reduce((acc, guildCount) => acc + guildCount, 0)} total users`);
      let users = `${result.reduce((acc, guildCount) => acc + guildCount, 0)}`;
      message.channel.createInvite()
      .then((invite) => {
        console.log(`Invite: ${invite.url}`)
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        embed.setDescription("**Bot info**\nBot invite: https://discord.com/oauth2/authorize?client_id=808613132850561055&permissions=8&scope=bot\n Bot servers: "+servers +"\n Bot users: "+users+"\nBot uptime: "+days+"d "+hours+"h "+minutes+"m "+seconds+"s"+"\n**Server info**\nServer invite: "+invite.url+"\nServer members: "+message.guild.members.cache.size+"\nServer prefix: "+prefix+"\nServer language: "+langchar)
      })
    })
    .catch(console.error);
	})
	.catch(console.error);
  message.channel.startTyping()
  setTimeout(() => {
    message.channel.send({embed})
    message.channel.stopTyping()
  }, 2000);
}