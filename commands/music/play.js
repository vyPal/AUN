const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p'],
			group: 'music',
			memberName: 'play',
			description: 'Plays a song in the voice channel that you are in.',
            examples: ['play lost in sound', 'p lost in sound'],
            guildOnly: true,
            args: [
                {
                    key: 'query',
                    label: 'The name of the song to play',
                    prompt: 'What is the song you would like to play?',
                    error: 'You have to tell me the name of the song. I don\'t read minds you know',
                    type: 'string'
                }
            ]
		});
	}

    async run (message, {query}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        await this.client.distube.play(message, message.content.slice(5).trim());
    }
}