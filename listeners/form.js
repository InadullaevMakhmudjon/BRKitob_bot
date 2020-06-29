import Markup from 'telegraf/markup';
import aggrement from '../messages/agreement';
import keyboards from '../keyboards';

export default (ctx, next, type) => {
  const message = aggrement(
    ctx,
    `${ctx.session.user.first_name} ${ctx.session.user.last_name}`,
    `${ctx.session.user.phone_number}`,
    type ? ctx.t('typeCourier') : ctx.t('typePickUp'),
    ctx.session.shopping,
  );
  ctx.reply(message, Markup.keyboard(keyboards.dilemma(ctx)).resize().extra());
  next();
};
