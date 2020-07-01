import invoice from '../hears/invoice';
import Orders from '../service/orders';
import main from '../hears/main';
import { LOADING } from '../utils/stickers';

const createOrder = ({ order, user, shopping }) => new Promise((resolve) => {
  Orders.create({
    ...order,
    userId: user.id,
    products: shopping.map(({ id: bookId, quantity }) => ({ bookId, quantity })),
  }).then(resolve);
});

export default async (ctx, next) => {
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  await ctx.answerCbQuery();
  if (!ctx.session.order) {
    ctx.session.order = {};
  }
  ctx.session.order.method = 1;
  await createOrder(ctx.session);
  await invoice(ctx, ctx.session.shopping);
  await ctx.telegram.deleteMessage(chatId, message_id);
  main(ctx, next);
};
