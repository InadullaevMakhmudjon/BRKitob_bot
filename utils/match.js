import { join } from 'path';
import fs from 'fs';

const kr = JSON.parse(fs.readFileSync(join(__dirname, '../locales/kr.json')));
const ru = JSON.parse(fs.readFileSync(join(__dirname, '../locales/ru.json')));

export const translate = (key, lang) => {
  const custom = { kr, ru };
  return custom[lang][key] || 'undefined';
};

export default (key, bot, callBack) => {
  if (typeof key === 'string') {
    const resultKr = kr[key] && bot.hears(kr[key], callBack);
    const resultRu = ru[key] && bot.hears(ru[key], callBack);
    if ((resultKr === false) && (resultRu === false)) {
      bot.hears(key, callBack);
    }
  } else {
    bot.hears(key, callBack);
  }
};
