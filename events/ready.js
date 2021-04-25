module.exports = async (client) => {
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
    ];
    var results = await Promise.all(promises)
    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
    const activities_list = [
        `.help`,
        `with ${totalGuilds} servers`,
        `with ${totalMembers} users`,
        `with ${client.shard.count} shards`
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000);
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    /*
    setInterval(() => {
        client.topggapi.postStats({
            serverCount: client.guilds.cache.size,
            shardId: client.shard.ids[0],
            shardCount: client.options.shardCount
        })
        console.log("Posted stats to top.gg")
    }, 1800000)
    */
    setInterval(() => {
        client.guilds.cache.forEach((guild) => {
            let punishmentlist = client.provider.get(guild, 'punishments', []);
            punishmentlist.filter(punishment => punishment.expires != null).forEach(async (punishment) => {
                const now = new Date();
                const expires = new Date(punishment.expires);
                if(now >= expires) {
                    if(punishment.type === 'mute') {
                        let muteRole = await guild.roles.cache.find(r => r.name === "Muted");
                        let member = await guild.members.cache.find(member => member.user.id == punishment.user_id);
                        member.roles.remove(muteRole);
                        punishmentlist.splice(punishmentlist.indexOf(punishment), 1);
                        await client.provider.set(guild, 'punishments', punishmentlist);
                    }
                }
            })
        })
    }, 5000);
};