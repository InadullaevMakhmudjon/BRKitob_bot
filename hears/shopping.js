import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import { MAIN_BOOKS } from '../events/types';

// Store back, To Books
export default async (ctx, next) => {
  let buttons = [];
  if (ctx.session.shopping) {
    const names = ctx.session.shopping
      .map((product) => `❌ ${product[`title_${ctx.session.lang}`]} (${product.quantity}${ctx.t('unit')})`);
    buttons = keyboards.order(ctx, names);
  }
  await ctx.reply(ctx.t('shopping'), Markup.keyboard(buttons).oneTime().resize().extra());

  // For back event
  ctx.trace(MAIN_BOOKS);
};
