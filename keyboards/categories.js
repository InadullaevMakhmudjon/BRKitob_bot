import Markup from 'telegraf/markup';

export const courses = (text) => Markup.button(text);
export const books = (text) => Markup.button(text);
export const profile = (text) => Markup.button(text);

// eslint-disable-next-line max-len
export default ({ courses: c, books: book, profile: p }) => [/* courses(c), */books(book), profile(p)];
