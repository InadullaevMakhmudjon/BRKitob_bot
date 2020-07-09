import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import { MAIN_BOOKS_SAVAT_ORDER } from '../events/types';
import form from '../listeners/form';

export default (ctx, next, type) => {
  ctx.session.order = { typeId: type ? 1 : 2 };
  if (type) {
    form(ctx, next, 1);
  } else {
    const buttons = keyboards.delivery(ctx, 0);
    ctx.reply(ctx.t('byLocationText'), Markup.keyboard(buttons).resize().extra());

    // For back event
    ctx.trace(MAIN_BOOKS_SAVAT_ORDER);
    next();
  }
};
