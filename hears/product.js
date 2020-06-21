import Markup from 'telegraf/markup';
import Book from '../service/books';
import generator from '../keyboards/generator';
import keyboards from '../keyboards';
import { numbers } from '../utils';
import books from './books';
import { LOADING } from '../utils/stickers';

// Store back, To Books
export default async (ctx, next) => {
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
  await ctx.reply(`${book[`description_${ctx.session.lang}`]}\n${ctx.t('price')}: ${book.price}`, Markup.keyboard(buttons).resize().extra());
  await ctx.telegram.deleteMessage(chatId, message_id);
  // For back event
  ctx.trace(books);
  next();
};
