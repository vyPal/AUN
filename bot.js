const Discord = require('discord.js');
const { FriendlyError, SQLiteProvider, CommandoClient } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
require('dotenv').config();
const oneLine = require('common-tags').oneLine;
const fs = require('fs');
const Topgg = require('@top-gg/sdk');
const DisTube = require("distube");

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

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, youtubeCookie: 'YSC=JwkFcDTVx5E; VISITOR_INFO1_LIVE=QFPNCyqa06g; GPS=1; PREF=tz=Europe.Prague; CONSENT=YES+CZ.en+V9+BX+367; SID=7geU8hVGTEfe889sF0faYgErcko6MqHLSZRnUiQ2UM6m4TBYhhFrOX5aA6fNGwkx_HzbbA.; __Secure-3PSID=7geU8hVGTEfe889sF0faYgErcko6MqHLSZRnUiQ2UM6m4TBYge-2Q29zrVj2HS_N4vyMTg.; HSID=AyrM54fEPTUlML_3e; SSID=ABpYJpJwvitCb9DoR; APISID=IX345G0vXXb8y7u0/ApCJ1tAhjgtQBzBFs; SAPISID=VZVFpXQyUdHa6xyP/AO4XTIAYGlk9Ed1tU; __Secure-3PAPISID=VZVFpXQyUdHa6xyP/AO4XTIAYGlk9Ed1tU; LOGIN_INFO=AFmmF2swRgIhANpjXWzlJidnN9BLnREcaeY17AScpdwxguFCTR6Xh-HtAiEAkIj7fDWsMGQkQjOREJl39A4o9rugZKmsdiC0g5iVWuE:QUQ3MjNmeEFtWUIxcDljaUdjM3hjbU01T1ZGSmhPU2w1c2hKT1J6b0hYcXYtOVRaVWloWHJyWWp5SVFGdERaeHNCSW9mYkFlNGpBRVFVQkNPS2VXRDYzbWVEcnpPeUM1TERadFFrY1MyZjBpMXhfVFFFWlZScVFJUEJZdUxoYlZ3aVA2cHkzS013LTNiaWZDX0pyNzMzSC1RMDQ0NXJaRTJzT296MWJJNEt1NEVHSzlsZjYtdzl3ZXNPWFF6SGN1bFFWVkNoMGxwSy04; SIDCC=AJi4QfHiVxwsYFPTpkj_ymRXdXG3w_2LtCDeAhzuNGj9kFIrK_rYAF5ezr24f3NnK5bARfAquw; __Secure-3PSIDCC=AJi4QfG63mTXNx3jvpYcoEg2v632AwuKls28_upLXKDCiRp9H6_LZ1pMRxRXHce8rgcohWO4'});
client.distube = distube;

fs.readdir("./music-events/", (err, files) => {
	files.forEach((file) => {
	  	const eventHandler = require(`./music-events/${file}`);
	  	const eventName = file.split(".")[0];
	  	distube.on(eventName, (...args) => eventHandler(client, ...args));
	});
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
		prefix: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.TOKEN);