const {default_prefix, default_language} = require('../config/config.json');
const dp = require('discord-prefix');
const settings = require('discord-server-settings');
module.exports = (client) => {
    const users = client.users.cache.size;
    const activities_list = [
      default_prefix+"help", 
      "with a bomb :)",
      "with " + users + " people", 
      "with JavaScript",
      "with some code",
      "corona memes",
      "tiktok vids",
      "with photoshop",
      "with his friend vyPal",
      "a random game",
      "some minecraft",
      "roblox (I'm a nerd :D)"
  ];
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
      client.user.setActivity(activities_list[index]);
  }, 30000);
  /*
  client.guilds.cache.forEach(guild => {
  console.log(`${guild.name} | ${guild.id} | ${guild.memberCount}\n`);
  })
  */
  dp.setPrefix(default_prefix);
  settings.setSetting(default_language, 'lang');
  settings.setSetting('false', 'premium');
  settings.setSetting('false', 'welcomer_join');
  settings.setSetting('false', 'welcomer_leave');

  setInterval(() => {
    client.topggapi.postStats({
      serverCount: client.guilds.cache.size,
      shardId: client.shard.ids[0],
      shardCount: client.options.shardCount
    })
    console.log("Posted stats to top.gg")
  }, 1800000)
};