import Markup from 'telegraf/markup';

export const gifts = (text) => Markup.button(text);
export const books = (text) => Markup.button(text);
export const bonuses = (text) => Markup.button(text);

// eslint-disable-next-line max-len
export default ({ gifts: g, books: book, bonuses: bonus }) => [gifts(g), books(book), bonuses(bonus)];
