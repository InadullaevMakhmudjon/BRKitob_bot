import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import { MAIN_BOOKS_SAVAT } from '../events/types';

// Store back, To Shopping
export default (ctx, next) => {
  ctx.reply(ctx.t('order'), Markup.keyboard(keyboards.orderTypes(ctx)).resize().extra());

  // For back event
  ctx.trace(MAIN_BOOKS_SAVAT);
};
