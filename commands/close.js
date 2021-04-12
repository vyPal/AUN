const Discord = require("discord.js");
const dp = require('discord-prefix');
const lang = require('../language_manager');
const settings = require('discord-server-settings');
const db = require('quick.db');

module.exports = async (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(message.channel.name.startsWith('ticket-')) {
    message.channel.send("Ticket closing in 5 seconds")
    setTimeout(() => {
      message.channel.delete("Ticket was closed.")
    }, 5000)
  }else{
    message.channel.send("This is not a ticket channel!")
  }
}