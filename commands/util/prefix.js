const { stripIndents, oneLine } = require('common-tags');
const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PrefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prefix',
			group: 'util',
			memberName: 'prefix',
			description: 'Shows or sets the command prefix.',
			format: '[prefix/"default"/"none"]',
			details: oneLine`
				If no prefix is provided, the current prefix will be shown.
				If the prefix is "default", the prefix will be reset to the bot's default prefix.
				If the prefix is "none", the prefix will be removed entirely, only allowing mentions to run commands.
				Only administrators may change the prefix.
			`,
			examples: ['prefix', 'prefix -', 'prefix omg!', 'prefix default', 'prefix none'],

			args: [
				{
					key: 'prefix',
					prompt: 'What would you like to set the bot\'s prefix to?',
					type: 'string',
					max: 15,
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
        const lcid = this.client.provider.get(msg.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
		// Just output the prefix
		if(!args.prefix) {
			const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
            const embed = new Discord.MessageEmbed()
                .setColor('#2fed28')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.prefix.title)
                .setDescription((prefix ? lang.prefix.prefix_is.replace('%prefix%', prefix) : lang.prefix.no_prefix) + "\n" + lang.prefix.command_usage.replace('%usage%', msg.anyUsage('command')))
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(msg.guild, 'prefix', '.')}prefix`);
            return msg.channel.send(embed);
			/*return msg.reply(stripIndents`
				${prefix ? `The command prefix is \`${prefix}\`.` : 'There is no command prefix.'}
				To run commands, use ${msg.anyUsage('command')}.
			`);*/
		}

		// Check the user's permission before changing anything
		if(msg.guild) {
			if(!msg.member.permissions.has('ADMINISTRATOR') && !this.client.isOwner(msg.author)) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#ed2828')
                    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                    .setTitle(lang.prefix.error.title)
                    .setDescription(lang.error.only_admin)
                    .setTimestamp()
                    .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(msg.guild, 'prefix', '.')}prefix`);
                return msg.channel.send(embed);
				/*return msg.reply('Only administrators may change the command prefix.');*/
			}
		} else if(!this.client.isOwner(msg.author)) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ed2828')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.prefix.error.title)
                .setDescription(lang.error.only_owner)
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(msg.guild, 'prefix', '.')}prefix`);
            return msg.channel.send(embed);
			/*return msg.reply('Only the bot owner(s) may change the global command prefix.');*/
		}

		// Save the prefix
		const lowercase = args.prefix.toLowerCase();
		const prefix = lowercase === 'none' ? '' : args.prefix;
		let response;
		if(lowercase === 'default') {
			if(msg.guild) msg.guild.commandPrefix = null; else this.client.commandPrefix = null;
			const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : lang.prefix.reset_no_prefix;
			response = lang.prefix.reset.replace('%current%', current);
		} else {
			if(msg.guild) msg.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;
			response = prefix ? lang.prefix.set.replace('%prefix%', args.prefix) : lang.prefix.removed;
		}

        const embed = new Discord.MessageEmbed()
            .setColor('#2fed28')
            .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
            .setTitle(lang.prefix.title)
            .setDescription(response + "\n" + lang.prefix.command_usage.replace('%usage%', msg.anyUsage('command')))
            .setTimestamp()
            .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(msg.guild, 'prefix', '.')}prefix`);
        await msg.channel.send(embed);

		/*await msg.reply(`${response} To run commands, use ${msg.anyUsage('command')}.`);*/
		return null;
	}
};