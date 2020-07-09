import invoice, { sendCourseInvoice } from '../hears/invoice';
import { LOADING } from '../utils/stickers';

export default async (ctx, next) => {
  await ctx.deleteMessage(ctx.session.message_id);
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  await ctx.answerCbQuery();
  if (!ctx.session.order) {
    ctx.session.order = {};
  }
  if (ctx.session.course) {
    ctx.session.course.payment.type = 1;
    await sendCourseInvoice(ctx, next);
  } else {
    await invoice(ctx, next);
  }
  await ctx.telegram.deleteMessage(chatId, message_id);
};
