const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'mute',
			aliases: ['m'],
			group: 'moderation',
			memberName: 'mute',
			description: 'Mutes a member on the server for a specified time in seconds, minutes, or hours. \nIf you want to mute them for an unspecified time (unmuting them using the unmute command) leave out the duration variable.',
            examples: ['mute @vyPal 5m', 'm @vyPal 5m', 'mute @vyPal 1h for spamming', 'm @vyPal 30s for spamming', 'mute @vyPal'],
            guildOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    key: 'member',
                    label: 'The member to be kicked',
                    prompt: 'Who would you like to kick?',
                    error: 'You have to specify a member or member ID',
                    type: 'member'
                },
                {
                    key: 'duration',
                    label: 'How long the user will be muted (h, m, s)',
                    prompt: 'For how long do you want to mute them? (Hours, minutes, or seconds)',
                    type: 'string',
                    default: '0'
                },
                {
                    key: 'reason',
                    label: 'The reason for the mute',
                    prompt: 'Why do you want to mute them?',
                    type: 'string',
                    default: ''
                }
            ]
		});
	}

    async run (message, {member, duration, reason}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
        if(!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#7c7c7c'
                },
                reason: 'There was no "Muted" role, so one was created automatically.'
            });
        }

        message.guild.channels.cache.forEach(async (channel) => {
            await channel.overwritePermissions([
                {
                    id: muteRole,
                    deny: ['SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'SPEAK']
                }
            ])
        });

        var expires;
        var dnow = new Date();

        if(duration === '0') {
            expires = null;
        }else{
            if(duration.endsWith('h')) {
                var hours = parseInt(duration);
                expires = dnow.setHours(dnow.getHours() + hours);
            }else if(duration.endsWith('m')) {
                var minutes = parseInt(duration);
                expires = dnow.setMinutes(dnow.getMinutes() + minutes);
            }else if(duration.endsWith('s')) {
                var seconds = parseInt(duration);
                expires = dnow.setSeconds(dnow.getSeconds() + seconds);
            }else{
                expires = null;
            }
        }

        member.roles.add(muteRole)
        .then(async () => {
            const embed = new Discord.MessageEmbed()
                .setColor('#2fed28')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.mute.title)
                .setDescription(lang.mute.description.replace('%usertag%', member.user.username+"#"+member.user.discriminator).replace('%duration%', expires ? duration : 'an unspecified time'))
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}mute`);
            message.channel.send(embed);
            const logmutes = this.client.provider.get(message.guild, 'log_command_mute', false);
            if(logmutes) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            let punishmentlist = this.client.provider.get(message.guild, 'punishments', []);
            let newmute = {
                id: punishmentlist.length + 1,
                user_id: member.user.id,
                reason: reason,
                date: new Date(),
                expires: expires,
                moderator_id: message.member.id,
                type: 'mute'
            };
            punishmentlist.push(newmute);
            await this.client.provider.set(message.guild, 'punishments', punishmentlist);
            return;
        }).catch((e) => {
            console.error(e);
            const embed = new Discord.MessageEmbed()
                .setColor('#ed2828')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.mute.error.title)
                .setDescription(lang.mute.error.description)
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}mute`);
            message.channel.send(embed);
            const logbans = this.client.provider.get(message.guild, 'log_command_mute', false);
            if(logbans) {
                const logchannel = this.client.channels.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            return;
        })
    }
}