import Markup from 'telegraf/markup';
import keyboards from '../keyboards';

export default (ctx, next) => {
  ctx.session = { user: ctx.session.user, lang: ctx.session.lang };
  const buttons = keyboards.categories({
    gifts: ctx.t('gifts'),
    books: ctx.t('books'),
    profile: ctx.t('profile'),
  });
  ctx.reply(ctx.t('chooseCategory'), Markup.keyboard(buttons).resize().extra());
  next();
};
