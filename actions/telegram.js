import invoice from '../hears/invoice';
import main from '../hears/main';
import { LOADING } from '../utils/stickers';

export default async (ctx, next) => {
  await ctx.deleteMessage(ctx.session.message_id);
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  await ctx.answerCbQuery();
  if (!ctx.session.order) {
    ctx.session.order = {};
  }
  await invoice(ctx, 55);
  await ctx.telegram.deleteMessage(chatId, message_id);
  main(ctx, next);
};
