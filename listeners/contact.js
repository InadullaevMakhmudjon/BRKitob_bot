import form from './form';

export default (ctx, next) => {
  const { contact } = ctx.update.message;
  ctx.session.contact = contact;
  form(ctx, next, !!ctx.session.type);
};
