import main from './main';
import invoice from './invoice';

export default (ctx, next, type) => {
  if (type) {
    invoice(ctx, ctx.session.shopping);
  } else {
    main(ctx, next);
  }
};
