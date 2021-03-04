const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const DisTube = require('distube');

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, youtubeCookie: 'CONSENT=PENDING+739; GPS=1; YSC=aJ-AJWRNXSE; VISITOR_INFO1_LIVE=VcRoEAtv-W0; PREF=tz=Europe.Prague; HSID=AvXKxG5L9QGMs2UXh; SSID=AI3DtPRyUdsXe6L02; APISID=fnvkQHGolhxhRF8e/ACS7py_9O7t2h9HOK; SAPISID=fBttb01TCiqfTsfl/AzzG0Mh_1RKBwqqZv; __Secure-3PAPISID=fBttb01TCiqfTsfl/AzzG0Mh_1RKBwqqZv; YTSESSION-1titawv=fc3233d08e6cd242803c1af675bc84d4c2gAAABBTmJxSk5rdk5pWXB1VzF1MjVTT1VBeTZkcl96eG5yNlh0ajBMYWlXSzhqSU5mSm8zbkJiQXJyU01UQjJDQnZHX2ZWaUZDUjNyUjF3X0owbHJ4eDZTbk1MdXNmdnBJUWNNajF2MklGUA==; LOGIN_INFO=AFmmF2swRQIhAIQkcNtTtxzry-frufqKsZgzczuYpXD7qVYHwTtizO9eAiBPfsbZlUL3CWu1LlrDrBfkq6LJs-KpvquF2BKkhQ6oRw:QUQ3MjNmeXdvNnZsTXd6dFk5c1ZFcURzdEF1RnU0NFBoMS1PWlZMWTREZ0lWVXppMmF3NVlNaGVsbTBEY1NSWmRrRnVGd21QbmVqSThPdEZoQkZkZ0xkQXg3cFhsbkVWV1loTWRtN1dTdTFzLW5IdU02a19rSTJ5LS1meGRpdTJVQkFTbmtkU3V3T09OcmZCaEM2LVIxcUtfYnBhdTVEbmhrUG8zU1F3SDFYQ25Zd3dQSjREMWdCUjd0ckpvbDN2ZmNiVGpsNGdvRnVy; SID=7QeU8lB0UWGPhEgl9A7wr_yoHTdWypfPINslht10IqZ7M6GS4pUshVlNB54e6qTREFZF1g.; __Secure-3PSID=7QeU8lB0UWGPhEgl9A7wr_yoHTdWypfPINslht10IqZ7M6GSHoP78810s5JWddKfOAbKtw.; SIDCC=AJi4QfEbou7nuMf5-XqAGPFBV3yaASfID1hpnDWpiLXwfhcTVGKtuMGqd_8WcBIS_6NdEaK0; __Secure-3PSIDCC=AJi4QfEUBzAiDaFFDrlnK8patP5BwQ9tCQvMQmE0xT1n2B76Zlibw7VkBnii0t_XTa2XfzuEew'});
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