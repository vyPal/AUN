const dp = require('discord-prefix');
const {owner_id} = require('../config/config.json');

const kick = require("../commands/kick");
const help = require("../commands/help");
const ban = require("../commands/ban");
const unban = require("../commands/unban");
const setprefix = require("../commands/setprefix");
const language = require("../commands/language");
const broadcast = require("../commands/broadcast");
const mute = require("../commands/mute");
const unmute = require("../commands/unmute");
const info = require("../commands/info");
const defaultchannel = require("../commands/defaultchannel");
const premium = require("../commands/premium");
const say = require("../commands/say");
const meme = require("../commands/meme");
const play = require("../commands/play");
const repeatloop = require("../commands/repeatloop")
const skip = require("../commands/skip");
const stop = require("../commands/stop");
const queue = require("../commands/queue");
const filter = require("../commands/filter");
const volume = require("../commands/volume");
const autoplay = require("../commands/autoplay");

module.exports = (client, message) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  if (message.author.bot) {return;}
  if (/<@!808613132850561055>|<@808613132850561055>/.test(message.content)) {return info (message, client);}
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
    if(message.author.id == owner_id) {
      return broadcast(message, client);
    }else{
      return message.channel.send("```This command is for the bot owner only```");
    }
  }else if(message.content.startsWith(prefix+"mute")){
    return mute(message, client);
  }else if(message.content.startsWith(prefix+"unmute")){
    return unmute(message, client);
  }else if(message.content.startsWith(prefix+"info")){
    return info(message, client);
  }else if(message.content.startsWith(prefix+"defaultchannel")){
    return defaultchannel(message, client);
  }else if(message.content.startsWith(prefix+"premium")){
    return premium(message, client);
  }else if(message.content.startsWith(prefix+"say")){
    return say(message, client);
  }else if(message.content.startsWith(prefix+"meme")){
    return meme.execute(client, message);
  }else if(message.content.startsWith(prefix+"play")){
    return play(message, client);
  }else if(['repeat', 'loop'].some(v => message.content.includes(v)) && message.content.startsWith(prefix)) {
    repeatloop(message, client);
  }else if(message.content.startsWith(prefix+"skip")){
    skip(message, client);
  }else if(message.content.startsWith(prefix+"stop")){
    stop(message, client);
  }else if(message.content.startsWith(prefix+"queue")){
    queue(message, client);
  }else if([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].some(v => message.content.includes(v)) && message.content.startsWith(prefix)){
    filter(message, client);
  }else if(message.content.startsWith(prefix+"volume")){
    volume(message, client);
  }else if(message.content.startsWith(prefix+"autoplay")){
    autoplay(message, client);
  }
}