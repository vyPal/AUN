const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hi!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//--------BOT---------

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', {
    totalShards: 2,
    token: process.env.DISCORD_TOKEN
});
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
manager.spawn();