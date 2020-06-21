import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import shopping from './shopping';

// Store back, To Shopping
export default (ctx) => {
  ctx.reply(ctx.t('order'), Markup.keyboard(keyboards.orderTypes(ctx)).resize().extra());

  // For back event
  ctx.trace(shopping);
};
