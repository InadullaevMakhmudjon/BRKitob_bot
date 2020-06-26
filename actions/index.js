import { buttons, isAddedButton } from '../keyboards/count';
import { COUNT, ADD_BASKET } from './types';
import books from '../hears/getBasket';

export default (bot) => {
  bot.on('callback_query', async (ctx, next) => {
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
        ctx.session.shopping.push(product);
        ctx.session.book = null;
        await ctx.editMessageReplyMarkup({ inline_keyboard: isAddedButton(ctx) });
        books(ctx, next);
        break;
      }
      default:
        break;
    }
  });
};
