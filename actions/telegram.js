import invoice from '../hears/invoice';
import Orders from '../service/orders';
import main from '../hears/main';

const createOrder = ({ order, user, shopping }) => new Promise((resolve) => {
  Orders.create({
    ...order,
    userId: user.id,
    products: shopping.map(({ id: bookId, quantity }) => ({ bookId, quantity })),
  }).then(resolve);
});

export default async (ctx, next) => {
  await ctx.answerCbQuery();
  if (!ctx.session.order) {
    ctx.session.order = {};
  }
  ctx.session.order.method = 1;
  await createOrder(ctx.session);
  await invoice(ctx, ctx.session.shopping);
  main(ctx, next);
};
