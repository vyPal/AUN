const dp = require('discord-prefix');
const Discord = require("discord.js");
const lang = require('../language_manager');
const settings = require('discord-server-settings');

module.exports = async (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  var langchar = settings.getSetting('lang', message.guild.id)
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  const amount = args.join(' ');
  if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!');
  if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!');

  if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!');
  if (amount < 1) return msg.reply('You have to delete at least 1 message!');

  await message.channel.messages.fetch({ limit: amount }).then(messages => {
    message.channel.bulkDelete(messages)
  });
  message.channel.send('Done! Successfully cleared ' + amount + 'messages').then((sent) => {
    setTimeout(() => {
      sent.delete();
    }, 5000);
  })
}