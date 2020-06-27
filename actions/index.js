import { buttons } from '../keyboards/count';
import { COUNT, ADD_BASKET } from './types';
import books from '../hears/getBasket';

export default (bot) => {
  bot.on('callback_query', async (ctx, next) => {
    await ctx.answerCbQuery();
    const data = JSON.parse(ctx.callbackQuery.data);
    switch (data.action) {
      case COUNT: {
        if (data.value + data.increment >= 1) {
          const value = data.value + data.increment;
          await ctx.editMessageReplyMarkup({ inline_keyboard: buttons(value, ctx) });
        }
        break;
      }
      case ADD_BASKET: {
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
        await ctx.telegram.deleteMessage(ctx.from.id, ctx.callbackQuery.message.message_id);
        books(ctx, next);
        break;
      }
      default:
        break;
    }
  });
};
