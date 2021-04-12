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
const vote = require("../commands/vote");
const lockdown = require("../commands/lockdown");
const welcomer = require("../commands/welcomer");
const bugreport = require("../commands/bugreport");
const clear = require("../commands/clear");
const eval_cmd = require("../commands/eval");
const ticket = require("../commands/ticket");
const close = require("../commands/close");
const snipe = require("../commands/snipe");

module.exports = async (client, message) => {
  let prefix = await dp.getPrefix();
  if(message.guild) {
    if(await dp.getPrefix(message.guild.id)){
      prefix = await dp.getPrefix(message.guild.id);
    }
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
  }else if([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `surround`].some(v => message.content.includes(v)) && message.content.startsWith(prefix)){
    filter(message, client);
  }else if(message.content.startsWith(prefix+"volume")){
    volume(message, client);
  }else if(message.content.startsWith(prefix+"autoplay")){
    autoplay(message, client);
  }else if(message.content.startsWith(prefix+"vote")){
    vote(message, client);
  }else if(message.content.startsWith(prefix+"lockdown")){
    lockdown(message, client);
  }else if(message.content.startsWith(prefix+"welcomer")){
    welcomer(message, client);
  }else if([`bugreport`, `bug`].some(v => message.content.includes(v)) && message.content.startsWith(prefix)){
    bugreport(message, client);
  }else if([`clear`, `purge`].some(v => message.content.includes(v)) && message.content.startsWith(prefix)){
    clear(message, client);
  }else if(message.content.startsWith(prefix+"eval")){
    eval_cmd(message, client);
  }else if(message.content.startsWith(prefix+"ticket")){
    ticket(message, client);
  }else if(message.content.startsWith(prefix+"close")){
    close(message, client);
  }else if(message.content.startsWith(prefix+"snipe")){
    snipe(message, client);
  }
}