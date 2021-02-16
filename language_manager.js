const settings = require('discord-server-settings');

const en = require("languages/english.json");

module.exports.get = (messageID, language) => {
  if (!language) language = settings.getSetting('lang');
  if (language == 'en') {
    return en.${messageID};
  }
}