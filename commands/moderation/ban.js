const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'ban',
			aliases: ['b'],
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans a member from the server.',
            examples: ['ban @vyPal sending spam messages', 'b @vyPal sending spam messages'],
            guildOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'member',
                    label: 'The member to be banned',
                    prompt: 'Who would you like to ban?',
                    error: 'You have to specify a member or member ID',
                    type: 'member'
                },
                {
                    key: 'reason',
                    label: 'The reason why you are banning the member',
                    prompt: 'Why do you want to ban them?',
                    error: 'You have to specify a reason for the ban',
                    type: 'string'
                }
            ]
		});
	}

    run (message, {member, reason}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        member.ban({reason: reason})
        .then(async () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#2fed28')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.ban.title)
                .setDescription(lang.ban.description.replace('%usertag%', member.user.username+"#"+member.user.discriminator))
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}ban`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_ban', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            let punishmentlist = this.client.provider.get(message.guild, 'punishments', []);
            let newban = {
                id: punishmentlist.length + 1,
                user_id: member.user.id,
                reason: reason,
                date: Date.now(),
                expires: null,
                moderator: message.member.id,
                type: 'ban'
            };
            punishmentlist.push(newban);
            await this.client.provider.set(message.guild, 'punishments', punishmentlist);
            return;
        }).catch(() => {
            const embed = new Discord.MessageEmbed()
                .setColor('#ed2828')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.ban.error.title)
                .setDescription(lang.ban.error.description)
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}ban`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_ban', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            return;
        })
    }
}