import countKeyboard from '../keyboards/count';
import Book from '../service/books';
import generator from '../keyboards/generator';
import keyboards from '../keyboards';
import { numbers } from '../utils';
import { LOADING } from '../utils/stickers';
import bookCaption from '../messages/caption';
import { MAIN_BOOKS } from '../events/types';

// Store back, To Books
export default async (ctx, next) => {
  if (ctx.session.course) ctx.session.course = null;
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  const book = await Book.getByTitle(ctx.session.lang, ctx.match);
  ctx.session.book = book;
  const buttons = generator(numbers, 3);
  buttons.push(keyboards.main(ctx));
  const images = book.images.map(({ url }) => ({
    type: 'photo',
    media: url,
  }));

  if (images.length) await ctx.replyWithMediaGroup(images);
  await ctx.reply(bookCaption(book, ctx), countKeyboard(1, ctx, next));
  await ctx.telegram.deleteMessage(chatId, message_id);

  // For back event
  ctx.trace(MAIN_BOOKS);
  next();
};
