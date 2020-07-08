import Markup from 'telegraf/markup';

export const gifts = (text) => Markup.button(text);
export const books = (text) => Markup.button(text);
export const profile = (text) => Markup.button(text);

// eslint-disable-next-line max-len
export default ({ gifts: g, books: book, profile: p }) => [books(book), profile(p)];
