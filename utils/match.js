import { join } from 'path';
import fs from 'fs';

const kr = JSON.parse(fs.readFileSync(join(__dirname, '../locales/kr.json')));
const lat = JSON.parse(fs.readFileSync(join(__dirname, '../locales/lat.json')));

export const translate = (key, lang) => {
  const custom = { kr, lat };
  return custom[lang][key] || 'undefined';
};

export default (key, bot, callBack) => {
  if (typeof key === 'string') {
    const resultKr = kr[key] && bot.hears(kr[key], callBack);
    const resultLat = lat[key] && bot.hears(lat[key], callBack);
    if ((resultKr === false) && (resultLat === false)) {
      bot.hears(key, callBack);
    }
  } else {
    bot.hears(key, callBack);
  }
};
