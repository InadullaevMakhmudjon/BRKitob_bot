import keyboards from '../keyboards';
import startMessage from '../messages/start';
import users from '../service/users';

export default (bot) => {
  bot.start(async (ctx, next) => {
    const user = await users.get(ctx.from.id);
    ctx.session = {};
    if (user) {
      ctx.session.user = user;
    } else {
      ctx.session.user = await users.create(ctx.from);
    }
    ctx.replyWithHTML(startMessage(ctx.session.user.first_name), keyboards.start);
    next();
  });
};
