const express = require('express');
const Topgg = require('@top-gg/sdk');
const app = express();
const port = 3000;

const webhook = new Topgg.Webhook(process.env.TOP_GG_WEBHOOK)

app.get('/', (req, res) => res.send('Hi!'));
app.post('/dblwebhook', webhook.middleware(), (req, res) => {
  console.log(req.vote.user)
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//--------BOT---------

const { ShardingManager } = require('discord.js');
const AutoPoster = require('topgg-autoposter');
const manager = new ShardingManager('./bot.js', {
    totalShards: 1,
    token: process.env.DISCORD_TOKEN
});
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
const poster = AutoPoster(process.env.TOP_GG_TOKEN, manager);
poster.on('posted', () => {
  console.log('Posted stats to top.gg')
});
manager.spawn();