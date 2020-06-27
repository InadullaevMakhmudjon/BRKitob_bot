import Gift from '../service/gifts';
import keyboards from '../keyboards';
import gifts from './gifts';
import { LOADING } from '../utils/stickers';

// Store back, To Books
export default async (ctx, next) => {
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  const gift = await Gift.getByTitle(ctx.session.lang, ctx.match);

  await ctx.replyWithPhoto({
    url: gift.image,
  }, {
    caption: `${gift[`description_${ctx.session.lang}`]}\n${ctx.t('price')}: ${gift.point} points`,
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: [keyboards.back(ctx)],
      resize_keyboard: true,
    },
  });
  await ctx.telegram.deleteMessage(chatId, message_id);

  // For back event
  ctx.trace(gifts);
  next();
};
