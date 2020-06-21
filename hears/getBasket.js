import books from './books';

export default (ctx, next) => {
  const quantity = Number(ctx.match);
  if (quantity && ctx.session.book) {
    const product = { ...ctx.session.book, quantity };
    if (!ctx.session.shopping) {
      ctx.session.shopping = [];
    }
    ctx.session.shopping.push(product);
  }
  ctx.session.book = null;
  books(ctx, next);
};
