import Markup from 'telegraf/markup';
import { MAIN } from '../events/types';

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
  ctx.trace(MAIN);
};
