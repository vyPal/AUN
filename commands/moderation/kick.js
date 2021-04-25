const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'kick',
			aliases: ['k'],
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a member from the server.',
            examples: ['kick @vyPal sending spam messages', 'k @vyPal sending spam messages'],
            guildOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'member',
                    label: 'The member to be kicked',
                    prompt: 'Who would you like to kick?',
                    error: 'You have to specify a member or member ID',
                    type: 'member'
                },
                {
                    key: 'reason',
                    label: 'The reason why you are kicking the member',
                    prompt: 'Why do you want to kick them?',
                    error: 'You have to specify a reason for the kick',
                    type: 'string'
                }
            ]
		});
	}

    run (message, {member, reason}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        member.kick(reason)
        .then(async () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#2fed28')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.kick.title)
                .setDescription(lang.kick.description.replace('%usertag%', member.user.username+"#"+member.user.discriminator))
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}kick`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_kick', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            let punishmentlist = this.client.provider.get(message.guild, 'punishments', []);
            let newkick = {
                id: punishmentlist.length + 1,
                user_id: member.user.id,
                reason: reason,
                date: Date.now(),
                expires: null,
                moderator: message.member.id,
                type: 'kick'
            };
            punishmentlist.push(newkick);
            await this.client.provider.set(message.guild, 'punishments', punishmentlist);
            return;
        }).catch(() => {
            const embed = new Discord.MessageEmbed()
                .setColor('#ed2828')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.kick.error.title)
                .setDescription(lang.kick.error.description)
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}kick`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_kick', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            return;
        })
    }
}