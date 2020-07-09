import Markup from 'telegraf/markup';
import Course from '../service/courses';
import generator from '../keyboards/generator';
import { MAIN } from '../events/types';

// Store back, To Main
export default async (ctx, next) => {
  ctx.session.course = null;

  // if (ctx.session.order) {
  //   ctx.session = { user: ctx.session.user, lang: ctx.session.lang };
  // }
  console.log('course clicked');
  const data = await Course.getAll();
  const courses = data.map((course) => course[`title_${ctx.session.lang}`]);
  const buttons = [];
  buttons.push(...generator(courses || []));
  await ctx.reply(ctx.t('chooseProduct'), Markup.keyboard(buttons).oneTime().resize().extra());

  // For back event
  ctx.trace(MAIN);
  next();
};
