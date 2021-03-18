const express = require('express');
const Topgg = require('@top-gg/sdk');
const app = express();
const port = 3000;
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
const serverSettings = require('discord-server-settings');
const userSettings = require('discord-user-settings');
const dp = require('discord-prefix');

const webhook = new Topgg.Webhook(process.env.TOP_GG_WEBHOOK)

//app.get('/', (req, res) => res.send('Hi!'));
app.post('/dblwebhook', webhook.middleware(), (req, res) => {
  console.log('User: '+req.vote.user+' has voted!')
});

const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
}));
require('./router')(app);

io.on('connection', function(client) {
    client.on('join', function(data) {
        console.log(data);
        //prefix
        client.on('prefix', function(data) {
          var json = JSON.parse(data);
          client.emit('broad', 'Set prefix to ' + json.prefix);
          //set
          if(json.cmd == "set") {
            dp.setPrefix(json.prefix, json.id);
          }
        });
        //language
        client.on('language', function(data) {
          var json = JSON.parse(data);
          client.emit('broad', 'Set language to ' + json.language);
          //set
          if(json.cmd == "set") {
            serverSettings.setSetting(json.language, 'lang', json.id);
          }
        });
        //default channel
        client.on('dchannel', function(data) {
          var json = JSON.parse(data);
          client.emit('broad', 'Set default channel to ' + json.channel);
          //set
          if(json.cmd == "set") {
            serverSettings.setSetting(json.channel, 'defaultchannel', json.id);
          }
        });
        //welcomer join module
        client.on('welcomerjoin', function(data) {
          var json = JSON.parse(data);
          client.emit('broad', 'Set welcomer join channel to ' + json.channel + ', and set message to '+ json.msg);
          //set
          if(json.cmd == "set") {
            serverSettings.setSetting('true', 'welcomer_join', json.id);
            serverSettings.setSetting(json.channel, 'welcomer_join_channel', json.id);
            serverSettings.setSetting(json.msg, 'welcomer_join_msg', json.id);
          }
        });
    });
});

server.listen(port, () => console.log(`App listening at https://www.aunbot.tk:${port}`));

//--------BOT---------

const { ShardingManager } = require('discord.js');
const AutoPoster = require('topgg-autoposter');
const manager = new ShardingManager('./bot.js', {
    totalShards: 1,
    token: process.env.DISCORD_TOKEN
});
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
manager.spawn();
