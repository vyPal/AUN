const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
		super(client, {
			name: 'unmute',
			aliases: ['um'],
			group: 'moderation',
			memberName: 'unmute',
			description: 'Unmutes a user that has previously been muted using the mute command',
            examples: ['unmute @vyPal', 'um @vyPal'],
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
                }
            ]
		});
	}

    async run (message, {member}) {
        const lcid = this.client.provider.get(message.guild, 'lcid', 'en-US');
        const lang = require(`../../languages/${lcid}.json`);
        let punishmentlist = await this.client.provider.get(message.guild, 'punishments', []);
        punishmentlist.filter(punishment => punishment.type == 'mute' && punishment.user_id == member.user.id).forEach(async (punishment) => {
            let muteRole = await message.guild.roles.cache.find(r => r.name === "Muted");
            member.roles.remove(muteRole)
            .catch((e) => {
                console.error(e);
                const embed = new Discord.MessageEmbed()
                    .setColor('#ed2828')
                    .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                    .setTitle(lang.unmute.error.title)
                    .setDescription(lang.unmute.error.description)
                    .setTimestamp()
                    .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}unmute`);
                message.channel.send(embed);
                const logbans = this.client.provider.get(message.guild, 'log_command_mute', false);
                if(logbans) {
                    const logchannel = this.client.channels.cache.get(this.client.provider.get(message.guild, 'log_channel'));
                    logchannel.send(embed);
                }
                return;
            })
            const embed = new Discord.MessageEmbed()
                .setColor('#2fed28')
                .setAuthor('AUN', 'https://drive.google.com/uc?export=view&id=129_JKrVi3IJ6spDDciA5Y5sm4pjUF7eI')
                .setTitle(lang.unmute.title)
                .setDescription(lang.unmute.description.replace('%usertag%', member.user.username+"#"+member.user.discriminator))
                .setTimestamp()
                .setFooter(`Ping: ${this.client.ws.ping} • ${this.client.provider.get(message.guild, 'prefix', '.')}unmute`);
            message.channel.send(embed);
            const logmutes = this.client.provider.get(message.guild, 'log_command_mute', false);
            if(logmutes) {
                const logchannel = this.client.channels.cache.get(this.client.provider.get(message.guild, 'log_channel'));
                logchannel.send(embed);
            }
            punishmentlist.splice(punishmentlist.indexOf(punishment), 1);
            await this.client.provider.set(message.guild, 'punishments', punishmentlist);
        })
    }
}