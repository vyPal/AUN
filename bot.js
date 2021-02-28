const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const DisTube = require('distube');

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, youtubeCookie: 'CONSENT=YES+CZ.en+V9+BX+388; SID=7QcfLPtRwaSR6wzurXuO0vNa-c7Fpz0eWgTlIbPzrfy10kjsZEsWPIvfIBDwQWgcMO7cog.; __Secure-3PSID=7QcfLPtRwaSR6wzurXuO0vNa-c7Fpz0eWgTlIbPzrfy10kjsrgJGL5RTeHdvpdaj7emoxg.; HSID=AghWbTcZf3iz7d8Vg; SSID=AOYiwmcPyrZKkZGut; APISID=kHhp8s8UU78T2v5A/APnLRlymEkysLs3Wi; SAPISID=thg3sAuE_BrQmugC/AIpipSnK4anaZaGe9; __Secure-3PAPISID=thg3sAuE_BrQmugC/AIpipSnK4anaZaGe9; VISITOR_INFO1_LIVE=-B0lAekv1Dc; PREF=tz=Europe.Prague; YSC=tGreJHeHWSI; SIDCC=AJi4QfHqyf4qL9OihmuPk2mbl0w4lWwu0D_kLGwUkLPXkppy7VFxwga1p9GnOhxmLZpI2uQnkA; __Secure-3PSIDCC=AJi4QfFjr9SEeLpyiWVrPXq2ahd5tvYJzRzH4ud5qdmftFZNz1WOlRK1k60vUDqO4kCWgVU1'});
client.distube = distube;

fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });
/*
fs.readdir("./music-events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./music-events/${file}`);
    const eventName = file.split(".")[0];
    client.distube.on(eventName, (...args) => eventHandler(client, ...args));
  });
});
*/
// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it 
// feature to hide the token we got earlier. 
client.login(process.env.DISCORD_TOKEN);