const Discord = require('discord.js');

module.exports = async (client, interaction, content) => {
  const { data, files } = await Discord.APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    content
  )
  .resolveData()
  .resolveFiles()
  return { ...data, files}
}