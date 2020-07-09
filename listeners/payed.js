import main from '../hears/main';
import Orders from '../service/orders';
import UserCourse from '../service/userCourse';
import aggrement, { agreementCourse } from '../messages/agreement';

const { CHANNEL_ID } = process.env;

const createOrder = (id, {
  order, user, shopping, location,
}) => Orders.create({
  ...order,
  ...location,
  userId: user.id,
  products: shopping.map(({ id: bookId, quantity }) => ({ bookId, quantity })),
}, id);

const createUserCourse = (id, userCourse) => UserCourse.create(userCourse, id);


const sendMessage = (ctx) => {
  const message = ctx.session.course ? agreementCourse(
    ctx,
    `${ctx.session.user.first_name} ${ctx.session.user.last_name}`,
    `${ctx.session.user.phone_number}`,
    ctx.session.course,
  ) : aggrement(
    ctx,
    `${ctx.session.user.first_name} ${ctx.session.user.last_name}`,
    `${ctx.session.user.phone_number}`,
    ctx.t('typeCourier'),
    ctx.session.shopping,
  );
  return ctx.telegram.sendMessage(CHANNEL_ID, message);
};

export default async (ctx, next) => {
  if (!ctx.session.course) ctx.session.order.method = 1;
  const { provider_payment_charge_id: id } = ctx.message.successful_payment || {};
  if (ctx.session.course) {
    await createUserCourse(id, {
      userId: ctx.session.user.id,
      courseId: ctx.session.course.id,
      type: 1,
    });
    await ctx.reply('Payed');
  } else {
    const { message } = await createOrder(id, ctx.session);
    await ctx.reply(message);
  }
  await sendMessage(ctx);
  main(ctx, next);
};
