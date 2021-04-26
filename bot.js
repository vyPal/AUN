const Discord = require('discord.js');
const { FriendlyError, SQLiteProvider, CommandoClient } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
require('dotenv').config();
const oneLine = require('common-tags').oneLine;
const fs = require('fs');
const Topgg = require('@top-gg/sdk');
const { Player } = require("discord-player");

const client = new CommandoClient({
	commandPrefix: '.',
	owner: '588686932918403072',
	invite: 'https://discord.gg/wq5JprbjdJ',
	ws: { intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'] }
});

fs.readdir("./events/", (err, files) => {
	files.forEach((file) => {
	  	const eventHandler = require(`./events/${file}`);
	  	const eventName = file.split(".")[0];
	  	client.on(eventName, (...args) => eventHandler(client, ...args));
	});
});

const api = new Topgg.Api(process.env.TOP_GG_TOKEN);
client.topggapi = api;

const player = new Player(client);
client.player = player;

player.on("trackStart", (message, track) => {
	message.channel.send(`Now playing ${track.title}...`);
  });

client
	.on('error', console.error)
	.on('warn', console.warn)
	/*.on('debug', console.log)*/
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});
	
client.setProvider(
	sqlite.open({ filename: path.join(__dirname, 'commandodb.db'), driver: sqlite3.Database }).then(db => new SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerGroup('moderation', 'Moderation')
	.registerGroup('music', 'Muisc')
	.registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
		prefix: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.TOKEN);