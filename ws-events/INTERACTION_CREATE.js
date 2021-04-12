const Discord = require('discord.js');

const help = require('../ws-commands/help');
const ban = require('../ws-commands/ban');

module.exports = async (client, interaction) => {
  const { name, options } = interaction.data;
  const command = name.toLowerCase();

  if(command === 'help') {
    help(client, interaction);
  }else if(command === 'ban') {
    ban(client, interaction);
  }
}