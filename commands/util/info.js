const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ms = require('ms');
const pjson = require('../../package.json');

module.exports = class InfoCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'info',
            aliases: ['i'],
            group: 'util',
            memberName: 'info',
			description: 'Shows you info about the bot, server, or a user',
            patterns: [/^<@(!)?834318140237676554>/gim],
            args: [
                {
                    key: 'type',
                    label: 'If you want info about the bot, server, or a user',
                    prompt: 'What do you want info about?',
                    type: 'string',
                    default: 'bot'
                },
                {
                    key: 'user',
                    label: 'If you want info about a user, ping him',
                    prompt: 'Who do you want info about?',
                    type: 'member',
                    default: '<@588686932918403072>'
                }
            ]
        });
    }

    async run (message, {type, user}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);

        if(type === "bot") {
            const promises = [
                this.client.shard.fetchClientValues('guilds.cache.size'),
                this.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
            ];
            
            var results = await Promise.all(promises)
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const embed = new Discord.MessageEmbed()
                .setColor('#03fcca')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.info.bot.title)
                .setDescription(lang.info.bot.description)
                .addFields([
                    {
                        name: lang.info.bot.fields[0].name,
                        value: lang.info.bot.fields[0].value,
                        inline: lang.info.bot.fields[0].inline,
                    },
                    {
                        name: lang.info.bot.fields[1].name,
                        value: lang.info.bot.fields[1].value.replace('%servers%', totalGuilds).replace('%users%', totalMembers).replace('%shards%', this.client.shard.count).replace('%shardid%', message.guild ? message.guild.shardID : '0').replace('%ms%', ms(this.client.uptime)),
                        inline: lang.info.bot.fields[1].inline,
                    },
                    {
                        name: lang.info.bot.fields[2].name,
                        value: lang.info.bot.fields[2].value.replace('%version%', pjson.version).replace('%host%', require('os').version),
                        inline: lang.info.bot.fields[2].inline,
                    },
                    {
                        name: lang.info.bot.fields[3].name,
                        value: lang.info.bot.fields[3].value,
                        inline: lang.info.bot.fields[3].inline,
                    }
                ])
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}info`);
            return message.channel.send(embed);
            /*return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);*/
        }else {
            const promises = [
                this.client.shard.fetchClientValues('guilds.cache.size'),
                this.client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
            ];
            
            var results = await Promise.all(promises)
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
        }
    }
}