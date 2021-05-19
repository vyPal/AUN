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
        this.client.distube.stop(message);
        const embed = new Discord.MessageEmbed()
            .setColor('#2fed28')
            .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
            .setTitle(lang.stop.title)
            .setDescription(lang.stop.description)
            .setTimestamp()
            .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}stop`);
        message.channel.send(embed);
    }
}