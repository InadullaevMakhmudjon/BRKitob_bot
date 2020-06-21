import books from './books';

export default (ctx, next) => {
  ctx.session.shopping = null;
  books(ctx, next);
};
