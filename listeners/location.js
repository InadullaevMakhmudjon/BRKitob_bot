import delivery from '../hears/delivery';
import form from './form';

export default (ctx, next) => {
  const { location } = ctx.update.message;
  ctx.session.location = location;
  // delivery(ctx, next, 1);
  form(ctx, next, 0);
};
