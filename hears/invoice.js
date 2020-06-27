const token = process.env.PAYMENT_TOKEN;

// for delivery, get by own
const withoutAddress = (prices) => ({
  title: 'Biznesrivoj book title',
  description: 'Biznesrivoj book description',
  provider_token: token,
  start_parameter: 'brkitob',
  currency: 'UZS',
  photo_url: 'https://cdn.paycom.uz/merchants/e9ff844a2f44e609c7671426bb40b8d383cb9a20.jpeg',
  is_flexible: false,
  need_shipping_address: false,
  prices,
  payload: {},
});

export default (ctx) => {
  const prices = ctx.session.shopping.map((product) => ({
    label: product[`title_${ctx.session.lang}`],
    amount: (product.price * product.quantity) * 100,
  }));
  ctx.replyWithInvoice(withoutAddress(prices));
};
