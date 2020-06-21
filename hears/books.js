import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import Book from '../service/books';
import generator from '../keyboards/generator';
import main from './main';

// Store back, To Main
export default async (ctx, next) => {
  ctx.session.book = null;

  const books = await Book.getAll();
  const buttons = generator(books.map((book) => book[`title_${ctx.session.lang}`]));
  buttons.push(keyboards.main(ctx));
  await ctx.reply(ctx.t('chooseProduct'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(main);
  next();
};
