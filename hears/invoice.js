import main from './main';

const token = process.env.PAYMENT_TOKEN;

// for delivery, get by own
const withoutAddress = (prices, title, description) => ({
  title,
  description,
  provider_token: token,
  start_parameter: 'brkitob',
  currency: 'UZS',
  photo_url: 'https://cdn.paycom.uz/merchants/e9ff844a2f44e609c7671426bb40b8d383cb9a20.jpeg',
  is_flexible: false,
  need_shipping_address: false,
  prices,
  payload: {},
});

export const sendCourseInvoice = async (ctx, next) => {
  const prices = [{
    label: ctx.session.course[`title_${ctx.session.lang}`],
    amount: ctx.session.course.price,
  }];
  await ctx.replyWithInvoice(withoutAddress(prices, ctx.t('invoiceTitle'), ctx.t('invoiceDescription')));
  await main(ctx, next);
};

export default async (ctx, next) => {
  const deliveryPrice = (ctx.session.order && ctx.session.order.typeId === 2 && 15000);
  const prices = ctx.session.shopping.map((product) => ({
    label: product[`title_${ctx.session.lang}`],
    amount: ((product.price * product.quantity) + deliveryPrice) * 100, // 15 000 for delivery price
  }));

  await ctx.replyWithInvoice(withoutAddress(prices, ctx.t('invoiceTitle'), ctx.t('invoiceDescription')));
  await main(ctx, next);
};
