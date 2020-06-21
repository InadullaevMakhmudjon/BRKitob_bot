import start from './start';
import main, { basket, back, generate } from './main';
import categories from './categories';
import generator from './generator';
import delivery from './delivery';

export const count = (ctx) => (ctx.session.shopping
  ? `(${ctx.session.shopping.reduce((a, b) => a + Number(b.quantity), 0)})`
  : '');

export default {
  start,
  basket: (ctx, text) => [basket(text || ctx.t('shopping'), count(ctx))],
  back: (ctx, text) => [back(text || ctx.t('back'))],
  main: (ctx) => main(ctx.t('shopping'), ctx.t('back'), count(ctx)),
  order: (ctx, names) => generate([ctx.t('back'), ctx.t('order')]).concat(generator(names)).concat([[back(ctx.t('clear'))]]),
  orderTypes: (ctx) => generate([ctx.t('typeCourier'), ctx.t('typePickUp'), ctx.t('back')])[0],
  delivery: (ctx, type) => delivery(ctx, type),
  dilemma: (ctx) => generate([ctx.t('agreementReject'), ctx.t('agreementAccept')])[0],
  categories: (text) => [categories(text)],
};
