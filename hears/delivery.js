import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import order from './order';
import form from '../listeners/form';

export default (ctx, next, type) => {
  ctx.session.order = { typeId: type ? 1 : 2 };
  if (type) {
    form(ctx, next, 1);
  } else {
    const buttons = keyboards.delivery(ctx, 0);
    ctx.reply(ctx.t('byLocationText'), Markup.keyboard(buttons).resize().extra());

    // For back event
    ctx.trace(order);
    next();
  }
};
