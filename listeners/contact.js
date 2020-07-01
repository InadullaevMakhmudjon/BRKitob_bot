import form from './form';
import main from '../hears/main';
import users from '../service/users';

export default async (ctx, next) => {
  const { contact } = ctx.update.message;
  const { phone_number } = contact;
  const user = { ...ctx.from, phone_number };
  ctx.session = {};
  ctx.session.user = await users.create(user);
  ctx.session.contact = contact;
  main(ctx, next);
  // form(ctx, next, !!ctx.session.type);
};
