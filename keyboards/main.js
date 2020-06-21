
import Markup from 'telegraf/markup';

export const basket = (text, count) => Markup.button(`${text} ${count}`);

export const back = (text) => Markup.button(`${text}`);

export const generate = (names) => [names.map((name) => Markup.button(name)).reduce((a, b) => a.concat(b), [])];

export default (basketText, backText, count) => [basket(basketText, count), back(backText)];
