import shopping from '../hears/shopping';

export default (ctx, next) => {
  const shops = `${ctx.update.message.text}`.includes(ctx.t('shopping'));
  if (shops) {
    shopping(ctx, next);
  } else {
    next();
  }
};
