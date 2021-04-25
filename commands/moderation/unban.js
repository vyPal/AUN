const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'unban',
			aliases: ['ub'],
			group: 'moderation',
			memberName: 'unban',
			description: 'Unbans a member from the server.',
            examples: ['unban vyPal', 'ub vyPal'],
            guildOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'member',
                    label: 'The member to be unbanned',
                    prompt: 'Who would you like to unban?',
                    error: 'You have to specify the username of the member',
                    type: 'string'
                }
            ]
		});
	}

    run (message, {member}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        let punishmentlist = this.client.provider.get(message.guild, 'punishments', []);
        const userpunished = punishmentlist.find(punishment => punsihment.user.username == member || punishment.user.id == member);
        if(!userpunished) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ed2828')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.unban.error.title)
                .setDescription(lang.unban.error.description)
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}unban`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_unban', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            return;
        }
        const user = this.client.users.resolve(userpunished.user.id);
        message.guild.members.unban(user.id)
        .then(async () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#2fed28')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.unban.title)
                .setDescription(lang.unban.description.replace('%usertag%', member.user.username+"#"+member.user.discriminator))
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}ban`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_ban', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            punishmentlist.splice(punishmentlist.indexOf(userpunished), 1);
            await this.client.provider.set(message.guild, 'punishments', punishmentlist);
            return;
        }).catch(() => {
            const embed = new Discord.MessageEmbed()
                .setColor('#ed2828')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.unban.error.title)
                .setDescription(lang.unban.error.description)
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}unban`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_unban', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            return;
        })
    }
}