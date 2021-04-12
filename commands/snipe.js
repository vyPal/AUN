const Discord = require('discord.js');
const db = require('quick.db');

module.exports = (message, client) => {
  let msg = db.get(`${message.channel.id}.snipe.msg`)
  let author = db.get(`${message.channel.id}.snipe.author`)
  let avatar = db.get(`${message.channel.id}.snipe.avatar`)
  try {
    const embed = new Discord.MessageEmbed()
    .setAuthor(author, avatar)
    .setDescription(msg)
    .setFooter('Get Sniped lol')
    .setColor('RANDOM')
    .setTimestamp();
    message.channel.send(embed);
  } catch (e) {
    console.log(e);
    message.channel.send('Nothing to snipe')
  }
}