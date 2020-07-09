import Markup from 'telegraf/markup';
import keyboards from '../keyboards';

export default async (ctx, next) => {
  ctx.session = { user: ctx.session.user, lang: ctx.session.lang };
  const buttons = keyboards.categories({
    // courses: ctx.t('courses'),
    books: ctx.t('books'),
    profile: ctx.t('profile'),
  });
  await ctx.reply(ctx.t('chooseCategory'), Markup.keyboard(buttons).resize().extra());
  next();
};
