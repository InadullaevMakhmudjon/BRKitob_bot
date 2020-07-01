import main from './main';
import keyboards from '../keyboards';

export default (ctx, next, type) => {
  if (type) {
    ctx.reply('Choose payment type', keyboards.paymentTypes.extra());
  } else {
    main(ctx, next);
  }
};
