const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'skip',
			aliases: ['sk'],
			group: 'music',
			memberName: 'skip',
			description: 'Skips the currently playing song',
            examples: ['skip', 'sk'],
            guildOnly: true
		});
	}

    async run (message) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        await this.client.distube.skip(message);
        const embed = new Discord.MessageEmbed()
            .setColor('#2fed28')
            .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
            .setTitle(lang.skip.title)
            .setDescription(lang.skip.description)
            .setTimestamp()
            .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}skip`);
        message.channel.send(embed);
    }
}