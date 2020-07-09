// import countKeyboard from '../keyboards/count';
import Markup from 'telegraf/markup';
import Course from '../service/courses';
import generator from '../keyboards/generator';
import keyboards from '../keyboards';
import { numbers } from '../utils';
import { LOADING } from '../utils/stickers';
import { courseCaption } from '../messages/caption';
import { BUY_COURSE } from '../actions/types';
import { MAIN_COURSES } from '../events/types';

// Store back, To Courses
export default async (ctx, next) => {
  console.log('a course clicked');
  const { message_id, chat: { id: chatId } } = await ctx.replyWithSticker(LOADING);
  const course = await Course.getByTitle(ctx.session.lang, ctx.match);
  ctx.session.course = course;
  const buttons = generator(numbers, 3);
  buttons.push(keyboards.main(ctx));

  await ctx.replyWithPhoto({
    url: course.image,
  }, {
    caption: courseCaption(course, ctx),
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: ctx.t('courseBuy'),
            callback_data: JSON.stringify({ action: BUY_COURSE, id: course.id }),
          },
        ],
      ],
    },
  });

  // await ctx.reply(bookCaption(book, ctx), countKeyboard(1, ctx, next));
  await ctx.telegram.deleteMessage(chatId, message_id);

  // For back event
  ctx.trace(MAIN_COURSES);
  next();
};
