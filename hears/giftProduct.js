import Gift from '../service/gifts';
import keyboards from '../keyboards';
import gifts from './gifts';
import { LOADING } from '../utils/stickers';
import { giftCaption } from '../messages/caption';

// Store back, To Books
export default async (ctx, next) => {
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  const gift = await Gift.getByTitle(ctx.session.lang, ctx.match);

  await ctx.replyWithPhoto({
    url: gift.image,
  }, {
    caption: giftCaption(gift, ctx),
    parse_mode: 'HTML',
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
