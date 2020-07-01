import locale from './locale';
import getBasket from './getBasket';
import { numbers } from '../utils';
import books from './books';
import deleteProduct from './deleteProduct';
import clear from './clear';
import order from './order';
import delivery from './delivery';
import dilemma from './dilemma';
import gifts from './gifts';
import myProfile from './myProfile';
import affordableGifts from './affordableGifts';
import form from '../listeners/form';
import profile from './profile';

export default (customHears) => {
  // Language selected
  customHears(['🇺🇿 Ўзбекча', '🇺🇿 O\'zbekcha'], async (ctx, next) => {
    ctx.session.shopping = null;
    locale(ctx, next);
  });

  // Main
  customHears('books', books);
  customHears('gifts', gifts);
  customHears('profile', profile);

  // Profile
  customHears('myProfile', myProfile);
  customHears('affordableGifts', affordableGifts);

  // Books
  customHears('clear', clear);
  customHears('order', order);
  customHears('typeCourier', (ctx, next) => delivery(ctx, next, 0));
  customHears('typePickUp', (ctx, next) => delivery(ctx, next, 1));
  customHears('agreementReject', (ctx, next) => dilemma(ctx, next, 0));
  customHears('agreementAccept', (ctx, next) => dilemma(ctx, next, 1));

  // Quantity selected
  customHears(numbers, getBasket);

  customHears((text) => `${text}`.includes('❌'), deleteProduct);
  customHears('back', (ctx, next) => { ctx.back(ctx, next); });
  customHears('skip', (ctx, next) => form(ctx, next, 1));
};
