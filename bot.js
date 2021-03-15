const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_INVITES', 'GUILD_EMOJIS'] } });
const fs = require("fs");
const DisTube = require('distube');

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, youtubeCookie: 'YSC=JwkFcDTVx5E; VISITOR_INFO1_LIVE=QFPNCyqa06g; GPS=1; PREF=tz=Europe.Prague; CONSENT=YES+CZ.en+V9+BX+367; SID=7geU8hVGTEfe889sF0faYgErcko6MqHLSZRnUiQ2UM6m4TBYhhFrOX5aA6fNGwkx_HzbbA.; __Secure-3PSID=7geU8hVGTEfe889sF0faYgErcko6MqHLSZRnUiQ2UM6m4TBYge-2Q29zrVj2HS_N4vyMTg.; HSID=AyrM54fEPTUlML_3e; SSID=ABpYJpJwvitCb9DoR; APISID=IX345G0vXXb8y7u0/ApCJ1tAhjgtQBzBFs; SAPISID=VZVFpXQyUdHa6xyP/AO4XTIAYGlk9Ed1tU; __Secure-3PAPISID=VZVFpXQyUdHa6xyP/AO4XTIAYGlk9Ed1tU; LOGIN_INFO=AFmmF2swRgIhANpjXWzlJidnN9BLnREcaeY17AScpdwxguFCTR6Xh-HtAiEAkIj7fDWsMGQkQjOREJl39A4o9rugZKmsdiC0g5iVWuE:QUQ3MjNmeEFtWUIxcDljaUdjM3hjbU01T1ZGSmhPU2w1c2hKT1J6b0hYcXYtOVRaVWloWHJyWWp5SVFGdERaeHNCSW9mYkFlNGpBRVFVQkNPS2VXRDYzbWVEcnpPeUM1TERadFFrY1MyZjBpMXhfVFFFWlZScVFJUEJZdUxoYlZ3aVA2cHkzS013LTNiaWZDX0pyNzMzSC1RMDQ0NXJaRTJzT296MWJJNEt1NEVHSzlsZjYtdzl3ZXNPWFF6SGN1bFFWVkNoMGxwSy04; SIDCC=AJi4QfHiVxwsYFPTpkj_ymRXdXG3w_2LtCDeAhzuNGj9kFIrK_rYAF5ezr24f3NnK5bARfAquw; __Secure-3PSIDCC=AJi4QfG63mTXNx3jvpYcoEg2v632AwuKls28_upLXKDCiRp9H6_LZ1pMRxRXHce8rgcohWO4'});
client.distube = distube;

fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});
/*
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
    */

fs.readdir("./music-events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./music-events/${file}`);
    const eventName = file.split(".")[0];
    distube.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it 
// feature to hide the token we got earlier. 
client.login(process.env.DISCORD_TOKEN);