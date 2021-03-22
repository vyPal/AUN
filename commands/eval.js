const Discord = require("discord.js");
const dp = require('discord-prefix');
const config = require("../config/config")

module.exports = (message, client) => {
  let prefix = dp.getPrefix();
  if(dp.getPrefix(message.guild.id)){
    prefix = dp.getPrefix(message.guild.id);
  }
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(message.author.id !== config.owner_id) return;
  try {
    const code = args.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
    message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }
}