import Markup from 'telegraf/markup';
import Gift from '../service/gifts';
import generator from '../keyboards/generator';
import keyboards from '../keyboards';
import main from './main';
import users from '../service/users';
import { AFFORDABLE } from '../constants/gifts';

export default async (ctx, next) => {
  // Fetch gifts that are only affordable by the user
  ctx.session.giftsState = AFFORDABLE;
  const user = await users.get(ctx.session.user.id);
  const gifts = await Gift.getAffordable(user.point.value);
  const buttons = generator(gifts.map((gift) => gift[`title_${ctx.session.lang}`]));
  buttons.push(keyboards.back(ctx));
  await ctx.reply(gifts.length ? ctx.t('chooseProduct') : ctx.t('doesNotExist'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(main);
  next();
};
