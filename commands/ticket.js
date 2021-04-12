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
  let ticketsMade = parseInt(db.get(`${message.guild.id}.ticket.made`) || '0') + 1;
  const ticketCategory = db.get(`${message.guild.id}.ticket.category`);
  let perms = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'];
  let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
  if(!role) {
    await message.guild.roles.create({data: {name: "Ticket Support", permissions: 0}});
    role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
  }
  const ticketchannel = await message.guild.channels.create(`ticket-${("000" + ticketsMade.toString()).slice(-4)}`, {
    type: "text",
    topic: ` This is the ticket of ${message.author.username}`,
    nsfw: false,
    parent: ticketCategory,
    permissionOverwrites: [
      {
        deny: 'VIEW_CHANNEL',
        id: message.guild.id
      },
      {
        allow: perms,
        id: message.author.id
      },
      {
        allow: perms,
        id: role.id
      },
    ],
  });
  const embed1 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Ticket created!')
  .setColor('#91ff00')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | '+prefix+command);
  message.channel.send(embed1).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, 5000)
  })
  const xemoji = await client.emojis.cache.get('826013813325299722');
  const embed2 = new Discord.MessageEmbed()
  .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
  .setTitle('Welcome to your ticket! Staff will be here as soon as posible! React with <a:x:'+xemoji+'> to close.')
  .setColor('#91ff00')
  .setTimestamp()
  .setFooter('Ping: ' + client.ws.ping + ' | AUN Tickets');
  ticketchannel.send(embed2).then(async (msg) => {
    const filter = (reaction, user) => reaction.emoji === xemoji;
    msg.react(xemoji).then(() => {
      const collector = msg.createReactionCollector(filter);
      collector.on('collect', (reaction, user) => {
        reaction.users.remove(user.id)
        ticketchannel.send("You now have 30 seconds to type 'confirm' to confirm the closing of the ticket");
        const msgfilter = m => m.author.id === user.id;
        ticketchannel.awaitMessages(msgfilter, {
          max: 1,
          time: 30000
        }).then((message) => {
          message = message.first()
          if(message && message.content == "confirm") {
            ticketchannel.send("Ticket closing in 5 seconds")
            setTimeout(() => {
              ticketchannel.delete("Ticket was closed.")
            }, 5000)
          }else{
            ticketchannel.send("Canceled")
          }
        })
      })
    })
  });
  db.add(`${message.guild.id}.ticket.made`, 1)
}