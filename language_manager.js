const settings = require('discord-server-settings');

const en = require("./languages/english.json");
const cz = require("./languages/czech.json");

module.exports.get = (messageID, language) => {
  if (!language) language = settings.getSetting('lang');
  if (language == 'en') {
    return en[`${messageID}`];
  } else if (language == 'cz') {
    return cz[`${messageID}`];
  } else {
    return en[`${messageID}`];
  }
}