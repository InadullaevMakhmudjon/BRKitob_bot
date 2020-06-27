import main from '../hears/main';
import Orders from '../service/orders';

export default async (ctx, next) => {
  const req = {
    userId: ctx.session.user.id,
    products: ctx.session.shopping.map(({ id: bookId, quantity }) => ({ bookId, quantity })),
  };
  await Orders.create(req);
  main(ctx, next);
};
