import main from './main';
import keyboards from '../keyboards';

export default async (ctx, next, type) => {
  if (type) {
    const { message_id } = await ctx.reply('Choose payment type', keyboards.paymentTypes.extra());
    ctx.session.message_id = message_id;
    next();
  } else {
    main(ctx, next);
  }
};
