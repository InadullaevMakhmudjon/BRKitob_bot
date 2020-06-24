import Markup from 'telegraf/markup';
import keyboards from '../keyboards';

export default (ctx, next) => {
  ctx.session = { user: ctx.session.user, lang: ctx.session.lang };
  const buttons = keyboards.categories({
    gifts: ctx.t('gifts'),
    books: ctx.t('books'),
    bonuses: ctx.t('bonuses'),
  });
  ctx.reply(ctx.t('chooseCategory'), Markup.keyboard(buttons).resize().extra());
  next();
};
