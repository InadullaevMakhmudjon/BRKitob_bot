import delivery from '../hears/delivery';
import form from './form';

export default (ctx, next) => {
  const { location } = ctx.update.message;
  ctx.session.type = 1;
  ctx.session.location = location;
  // delivery(ctx, next, 1);
  form(ctx, next, !!ctx.session.type);
};
