import Markup from 'telegraf/markup';
import Gift from '../service/gifts';
import generator from '../keyboards/generator';
import keyboards from '../keyboards';
import { MAIN } from '../events/types';

export default async (ctx, next) => {
  ctx.session.giftsState = 'ALL';
  const gifts = await Gift.getAll();
  const buttons = generator(gifts.map((gift) => `${gift[`title_${ctx.session.lang}`]}`));
  buttons.push(keyboards.back(ctx));
  await ctx.reply(ctx.t('chooseProduct'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(MAIN);
  next();
};
