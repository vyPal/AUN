const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'queue',
			aliases: ['q'],
			group: 'music',
			memberName: 'queue',
			description: 'Shows the songs that are left in the current queue',
            examples: ['queue', 'q'],
            guildOnly: true
		});
	}

    async run (message) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        let queue = this.client.distube.getQueue(message);
        const embed = new Discord.MessageEmbed()
            .setColor('#2fed28')
            .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
            .setTitle(lang.queue.title)
            .setDescription(lang.queue.description.replace('%songs%', queue.songs.map((song, id) => 
                lang.queue.songformat.replace('%id%', id + 1).replace('%name%', song.name).replace('%duration%', song.formattedDuration)
            ).slice(0, 10).join('\n')))
            .setTimestamp()
            .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}queue`);
        message.channel.send(embed);
    }
}