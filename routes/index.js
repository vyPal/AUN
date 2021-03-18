const router = require('express').Router();
const Discord = require('discord.js');
const serverSettings = require('discord-server-settings');
const userSettings = require('discord-user-settings');
const dp = require('discord-prefix');
const client = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_INVITES', 'GUILD_EMOJIS'] } });
client.login(process.env.DISCORD_TOKEN);


router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Dashboard', user: req.session.user || null});
});

router.get('/servers', (req, res) => {
    if (!req.session.user) return res.redirect('/authorize');
    res.render('servers', { pageTitle: 'Servers', user: req.session.user || null , guilds: req.session.guilds, discordClient: client });
});

router.get('/server', (req, res) => {
    if (!req.session.user) return res.redirect('/authorize');
    if (!req.query.id) return res.redirect('/servers');
    res.render('server', { pageTitle: `Server manager`, user: req.session.user || null, guilds: req.session.guilds, guild_id: req.query.id , discordClient: client, serverSettings: serverSettings, userSettings: userSettings, discordPrefix: dp});
});

module.exports = router;