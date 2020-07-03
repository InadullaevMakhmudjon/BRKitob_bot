import Markup from 'telegraf/markup';
import keyboards from '../keyboards';
import order from './order';

export default (ctx, next, type) => {
  const buttons = keyboards.delivery(ctx, type);
  ctx.session.order = { typeId: type ? 1 : 2 };
  ctx.reply(ctx.t(type ? 'byPhoneText' : 'byLocationText'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(order);
  next();
};
