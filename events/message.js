const dp = require('discord-prefix');

const kick = require("../commands/kick");
const help = require("../commands/help");
const ban = require("../commands/ban");
const unban = require("../commands/unban");
const setprefix = require("../commands/setprefix");
const language = require("../commands/language");
const broadcast = require("../commands/broadcast");

module.exports = (client, message) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  if (message.author.bot) {return;}
  if (message.content.startsWith(prefix+"kick")) {
    return kick(message, client);
  }else if(message.content.startsWith(prefix+"help")){
    return help(message, client);
  }else if(message.content.startsWith(prefix+"ban")){
    return ban(message, client);
  }else if(message.content.startsWith(prefix+"unban")){
    return unban(message, client);
  }else if(message.content.startsWith(prefix+"setprefix")){
    return setprefix(message, client);
  }else if(message.content.startsWith(prefix+"language")){
    return language(message, client);
  }else if(message.content.startsWith(prefix+"broadcast")){
    if(message.author.id == 588686932918403072) {
      return broadcast(message, client);
    }else{
      return;
    }
  }
}