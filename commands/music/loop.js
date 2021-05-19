const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PlayCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'loop',
			aliases: ['l', 'repeat', 'r'],
			group: 'music',
			memberName: 'loop',
			description: 'Sets the repeat mode: 0 - off, 1 - repeat song, 2 - repeat queue',
            examples: ['loop 1', 'repeat 2', 'l 0'],
            guildOnly: true,
            args: [
                {
                    key: 'mode',
                    label: 'The repeat mode to be set',
                    prompt: 'What mode would you like? (0 - off, 1 - repeat song, 2 - repeat queue)',
                    error: 'You have to provide a repeat mode',
                    type: 'integer'
                }
            ]
		});
	}

    async run (message, {mode}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        await this.client.distube.setRepeatMode(message, mode);
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        const embed = new Discord.MessageEmbed()
            .setColor('#2fed28')
            .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
            .setTitle(lang.loop.title)
            .setDescription(lang.loop.description.replace('%mode%', mode))
            .setTimestamp()
            .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}loop`);
        message.channel.send(embed);
    }
}