const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StopCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'stop',
			aliases: ['s'],
			group: 'music',
			memberName: 'stop',
			description: 'Stops all the music in your channel and the bot disconnects.',
            examples: ['stop', 's'],
            guildOnly: true,
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: [],
            args: []
		});
	}

    run (message) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        this.client.player.stop(message.guild);
    }
}