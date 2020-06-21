import shopping from './shopping';
import books from './books';

function updateProduct(array, name, lang) {
  // eslint-disable-next-line no-restricted-syntax
  for (const i in array) {
    if (array[i][`title_${lang}`] === name) {
      if ((Number(array[i].quantity) - 1) > 0) {
        // eslint-disable-next-line no-param-reassign
        array[i].quantity = Number(array[i].quantity) - 1;
      } else {
        array.splice(i, 1);
      }
      break;
    }
  }
}

export default (ctx, next) => {
  const productName = ctx.update.message.text.slice(2).replace(/ *\([^)]*\) */g, '');
  updateProduct(ctx.session.shopping, productName, ctx.session.lang);
  if (!ctx.session.shopping.length) {
    // eslint-disable-next-line no-param-reassign
    ctx.session.shopping = null;
    books(ctx, next);
  } else {
    shopping(ctx, next);
  }
};
