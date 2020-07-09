import Gift from '../service/gifts';
import keyboards from '../keyboards';
import { LOADING } from '../utils/stickers';
import { giftCaption } from '../messages/caption';
import { AFFORDABLE, ALL } from '../constants/gifts';
import { GET_GIFT } from '../actions/types';
import { MAIN_GIFTS, MAIN_PROFILE } from '../events/types';

// Store back, To Books
export default async (ctx, next) => {
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  const gift = await Gift.getByTitle(ctx.session.lang, ctx.match);
  ctx.session.gift = gift;
  const options = {
    caption: giftCaption(gift, ctx),
    parse_mode: 'HTML',
    reply_markup: {
      resize_keyboard: true,
    },
  };

  if (ctx.session.giftsState === AFFORDABLE) {
    options.reply_markup.inline_keyboard = [
      [
        {
          text: ctx.t('getGift'),
          callback_data: JSON.stringify({ action: GET_GIFT, id: gift.id }),
        },
      ],
    ];
  } else if (ctx.session.giftsState === ALL) {
    options.reply_markup.keyboard = [keyboards.back(ctx)];
  }

  await ctx.replyWithPhoto({
    url: gift.image,
  }, options);
  await ctx.telegram.deleteMessage(chatId, message_id);

  // For back event
  ctx.trace(ctx.session.giftsState === ALL ? MAIN_GIFTS : MAIN_PROFILE);
  next();
};
