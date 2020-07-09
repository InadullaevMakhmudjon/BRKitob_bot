import Markup from 'telegraf/markup';
import aggrement, { agreementCourse } from '../messages/agreement';
import keyboards from '../keyboards';

export default (ctx, next, type) => {
  const message = ctx.session.course ? agreementCourse(
    ctx,
    `${ctx.session.user.first_name} ${ctx.session.user.last_name}`,
    `${ctx.session.user.phone_number}`,
    ctx.session.course,
  ) : aggrement(
    ctx,
    `${ctx.session.user.first_name} ${ctx.session.user.last_name}`,
    `${ctx.session.user.phone_number}`,
    type,
    ctx.session.shopping,
  );
  ctx.reply(message, Markup.keyboard(keyboards.dilemma(ctx)).resize().extra());
  next();
};
