const Discord = require('discord.js');
const db = require('quick.db');

module.exports = (client, message) => {
  db.set(`${message.channel.id}.snipe.msg`, message.content)
  db.set(`${message.channel.id}.snipe.author`, message.author.tag)
  db.set(`${message.channel.id}.snipe.avatar`, message.author.displayAvatarURL())
}