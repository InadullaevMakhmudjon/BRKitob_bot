import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import Book from '../service/books';
import generator from '../keyboards/generator';
import { MAIN } from '../events/types';

// Store back, To Main
export default async (ctx, next) => {
  ctx.session.book = null;

  if (ctx.session.order) {
    ctx.session = { user: ctx.session.user, lang: ctx.session.lang };
  }

  const data = await Book.getAll();
  const books = data.map((book) => book[`title_${ctx.session.lang}`]);
  const buttons = [keyboards.main(ctx)];
  buttons.push(...generator(books || []));
  await ctx.reply(ctx.t('chooseProduct'), Markup.keyboard(buttons).oneTime().resize().extra());

  // For back event
  ctx.trace(MAIN);
  next();
};
