const { ShardingManager } = require('discord.js');
require('dotenv').config();

const manager = new ShardingManager('./bot.js', {
    totalShards: 1,
    shardList: 'auto',
    mode: 'process',
    respawn: true,
    shardArgs: [],
    execArgv: [],
    token: process.env.TOKEN
});

manager.on('shardCreate', (shard) => {
	console.log(`----- SHARD ${shard.id} LAUNCHED -----`);
	shard.on('death', () => console.log(`----- SHARD ${shard.id} DIED -----`))
		.on('ready', () => console.log(`----- SHARD ${shard.id} READY -----`))
		.on('disconnect', () => console.log(`----- SHARD ${shard.id} DISCONNECTED -----`))
		.on('reconnecting', () => console.log(`----- SHARD ${shard.id} RECONNECTING -----`));
});

manager.spawn();