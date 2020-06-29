import Markup from 'telegraf/markup';
import Gift from '../service/gifts';
import generator from '../keyboards/generator';
import keyboards from '../keyboards';
import main from './main';

export default async (ctx, next) => {
  // Fetch gifts that are only affordable by the user
  const gifts = await Gift.getAffordable(ctx.session.user.point);
  const buttons = generator(gifts.map((gift) => gift[`title_${ctx.session.lang}`]));
  buttons.push(keyboards.back(ctx));
  await ctx.reply(ctx.t('chooseProduct'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(main);
  next();
};
