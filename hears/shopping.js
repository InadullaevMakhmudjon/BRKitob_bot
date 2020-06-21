import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import books from './books';

// Store back, To Books
export default async (ctx, next) => {
  let buttons = [];
  if (ctx.session.shopping) {
    const names = ctx.session.shopping
      .map((product) => `❌ ${product[`title_${ctx.session.lang}`]} (${product.quantity}${ctx.t('unit')})`);
    buttons = keyboards.order(ctx, names);
  }
  await ctx.reply(ctx.t('shopping'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(books);
  next();
};
