import main from '../hears/main';
import books from '../hears/books';
import gifts from '../hears/gifts';
import profile from '../hears/profile';
import courses from '../hears/courses';
import shopping from '../hears/shopping';
import order from '../hears/order';
import delivery from '../hears/delivery';
import * as types from './types';

const map = {
  [types.MAIN]: main,
  [types.MAIN_GIFTS]: gifts,
  [types.MAIN_PROFILE]: profile,
  [types.MAIN_BOOKS]: books,
  [types.MAIN_COURSES]: courses,
  [types.MAIN_BOOKS_SAVAT]: shopping,
  [types.MAIN_BOOKS_SAVAT_ORDER]: order,
  [types.MAIN_BOOKS_SAVAT_ORDER_COURER]: (ctx, next) => delivery(ctx, next, 0),
  [types.MAIN_BOOKS_SAVAT_ORDER_COURER]: (ctx, next) => delivery(ctx, next, 1),
};

// eslint-disable-next-line max-len
export default (ctx, next, type = types.MAIN) => (map[type] && map[type](ctx, next)) || Promise.resolve();
