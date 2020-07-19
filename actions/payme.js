import Orders from '../service/orders';
import UserCourse from '../service/userCourse';
import main from '../hears/main';
import { LOADING } from '../utils/stickers';

const createOrder = ({
  order, user, shopping, location,
}) => new Promise((resolve) => {
  Orders.create({
    ...order,
    ...location,
    userId: user.id,
    products: shopping.map(({ id: bookId, quantity, price }) => ({ bookId, quantity, price })),
  }).then(resolve);
});

const createUserCourse = (userCourse) => new Promise((resolve) => {
  UserCourse.create(userCourse).then(resolve);
});

export default async (ctx, next) => {
  await ctx.deleteMessage(ctx.session.message_id);
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  await ctx.answerCbQuery();
  if (!ctx.session.order) {
    ctx.session.order = {};
  }
  if (ctx.session.course) {
    const { url } = await createUserCourse({
      userId: ctx.session.user.id, courseId: ctx.session.course.id, type: 2,
    });
    ctx.reply(url);
  } else {
    ctx.session.order.method = 2;
    const { url } = await createOrder(ctx.session);
    await ctx.reply(url);
  }
  await ctx.telegram.deleteMessage(chatId, message_id);
  main(ctx, next);
};
