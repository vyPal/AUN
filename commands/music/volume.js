const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'volume',
			aliases: ['v', 'vol'],
			group: 'music',
			memberName: 'volume',
			description: 'Sets the playback volume of the song. (Default: 50)',
            examples: ['volume 25', 'v 10', 'vol 100'],
            guildOnly: true,
            args: [
                {
                    key: 'volume',
                    label: 'What volume to play the song at.',
                    prompt: 'What would you like to set the volume to?',
                    error: 'You have to supply a new volume',
                    type: 'integer'
                }
            ]
		});
	}

    async run (message, {volume}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        await this.client.distube.setVolume(message, volume);
        const embed = new Discord.MessageEmbed()
            .setColor('#2fed28')
            .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
            .setTitle(lang.volume.title)
            .setDescription(lang.volume.description.replace('%volume%', volume))
            .setTimestamp()
            .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}volume`);
        message.channel.send(embed);
    }
}