import Markup from 'telegraf/markup';
import main from './main';

export default (ctx, next) => {
  const buttons = [
    [
      ctx.t('affordableGifts'),
      ctx.t('myProfile'),
    ], [
      ctx.t('back'),
    ],
  ];

  ctx.reply(ctx.t('choose'), Markup.keyboard(buttons).resize().extra());

  // For back event
  ctx.trace(main);
  next();
};
