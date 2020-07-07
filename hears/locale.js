import Markup from 'telegraf/markup';
import main from './main';
import users from '../service/users';
import keyboards from '../keyboards';

const getLang = (match) => {
  if (match.includes('Ўзбекча')) return 'kr';
  if (match.includes('O\'zbekcha')) return 'lat';
  return 'kr';
};

export default async (ctx, next) => {
  ctx.session = {};
  ctx.session.lang = getLang(ctx.match);
  const user = await users.get(ctx.from.id);
  if (!user) {
    await ctx.reply(ctx.t('byPhoneText'), keyboards.contact(ctx));
    next();
  } else {
    ctx.session.user = user;
    main(ctx, next);
  }
};
