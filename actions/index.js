import { buttons, isAddedButton } from '../keyboards/count';
import {
  COUNT, ADD_BASKET, GET_GIFT, BUY_COURSE,
} from './types';
import books from '../hears/getBasket';
import profile from '../hears/profile';
import payme from './payme';
import telegram from './telegram';
import giftMessage from '../messages/gift';
import users from '../service/users';
import { sendCourseInvoice } from '../hears/invoice';

require('dotenv').config();

const { CHANNEL_ID } = process.env;

export default (bot) => {
  bot.action('telegram', telegram);
  bot.action('payme', payme);
  bot.on('callback_query', async (ctx, next) => {
    try {
      const data = JSON.parse(ctx.callbackQuery.data);
      switch (data.action) {
        case COUNT: {
          await ctx.answerCbQuery();
          if (data.value + data.increment >= 1) {
            const value = data.value + data.increment;
            await ctx.editMessageReplyMarkup({ inline_keyboard: buttons(value, ctx) });
          }
          break;
        }
        case ADD_BASKET: {
          await ctx.answerCbQuery(ctx.t('addedToBasket'));
          const product = { ...ctx.session.book, quantity: data.quantity };
          if (!ctx.session.shopping) {
            ctx.session.shopping = [];
          }
          const found = ctx.session.shopping.findIndex(({ id }) => id == product.id);
          if (found !== -1) {
            ctx.session.shopping[found].quantity += +product.quantity;
          } else {
            ctx.session.shopping.push(product);
          }
          ctx.session.book = null;
          await ctx.editMessageReplyMarkup({ inline_keyboard: isAddedButton(ctx) });
          books(ctx, next);
          break;
        }
        case GET_GIFT: {
          try {
            const giftId = data.id;
            const updatedPoint = await users.getGift(ctx.session.user.id, giftId);
            ctx.session.user.point.value = updatedPoint.value;

            await ctx.answerCbQuery(ctx.t('added'));

            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

            // This sends message to channel about new Gift request
            await ctx.telegram.sendMessage(CHANNEL_ID, giftMessage(ctx), { parse_mode: 'Markdown' });
            profile(ctx, next);
          } catch (error) {
            await ctx.answerCbQuery(ctx.t('notEnough'));
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);
            profile(ctx, next);
          }
          break;
        }
        case BUY_COURSE: {
          await sendCourseInvoice(ctx, next);
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
