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

router.get('/me', (req, res) => {
  if (!req.session.user) return res.redirect('/authorize');
    res.render('me', { pageTitle: 'Me - ' + req.session.user.tag, user: req.session.user || null, userSettings: userSettings});
});

router.get('/me/deals', (req, res) => {
  if (!req.session.user) return res.redirect('/authorize');
    res.render('deals', { pageTitle: 'Special deals', user: req.session.user || null, userSettings: userSettings});
});

router.get('/me/premium', (req, res) => {
  if (!req.session.user) return res.redirect('/authorize');
    res.render('premium', { pageTitle: 'Your premium', user: req.session.user || null, userSettings: userSettings});
});

router.get('/docs', (req, res) => {
    res.render('docs/index', { pageTitle: 'AUN Docs', user: req.session.user || null});
});

router.get('/docs/commands', (req, res) => {
    res.render('docs/commands', { pageTitle: 'AUN Docs', user: req.session.user || null});
});

router.get('/docs/premium', (req, res) => {
    res.render('docs/premium', { pageTitle: 'AUN Docs', user: req.session.user || null});
});

module.exports = router;